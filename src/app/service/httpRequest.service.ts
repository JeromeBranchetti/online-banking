import { TransactionService } from './transaction.service';
import { BankTransaction } from './../class/bankTransaction.model';
import { SignUpService } from './signUp.service';

import { AuthService } from './auth.service';
import { utente } from './../class/utente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { conto } from '../class/conto';
import { UtenteService } from './utente.service';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  token: string;
  utente: utente;
  conti!: conto[];
  transaction: BankTransaction[];
  conto!: conto;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private sign: SignUpService,
    private US: UtenteService,
    private root: Router,
    private transactionService: TransactionService
  ) {}

  // Chiamate Get

  GetConto(id: string) {
    this.http
      .get<conto>('http://localhost:3000/conti', {
        params: {
          id: id,
        },
      })
      .subscribe((res) => {
        this.conto = res[0];
        this.conto.iban =
          'it000000000000' +
          this.conto.numero_conto.toString() +
          this.conto.id.toString() +
          this.conto.idUt.toString();

        this.sign.bsconto.next(this.conto);
      });
  }

  GetUserid(id: string) {
    this.US.idUt = id;
    this.http
      .get<utente>('http://localhost:3000/utenti', {
        params: {
          id: id,
        },
      })
      .subscribe((res) => {
        this.utente = res;

        this.sign.bs.next(this.utente);
      });
  }

  GetUser(ema: string, pass: string) {
    //utente appena loggato
    this.http
      .get<utente>('http://localhost:3000/utenti', {
        params: { email: ema, password: pass },
      })
      .subscribe((res) => {
        console.log(res);
        this.US.idUt = res[0].id;
        this.auth.loggedIn.next(true);
        this.root.navigate(['/home-page-guest'], {
          queryParams: {
            idUt: this.US.idUt,
            idCont: this.US.idCont,
          },
        });
      });
  }

  onGetTransaction() {
    this.http
      .get<BankTransaction[]>('http://localhost:3000/transazioni')
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetUser() {
    this.token = this.auth.accessToken;
    console.log('Get: ' + this.token);
    return this.http.get<utente[]>(
      'http://localhost:8080/authentication/utenti',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      }
    );
  }

  onGetAccount() {
    this.token = this.auth.accessToken;
    this.http
      .get<utente[]>('http://localhost:8080/account/utenti/1/conti', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  // Chiamate post

  onAddUser(ut: utente) {
    // utente iscritto

    console.log(ut);
    this.http
      .post('http://localhost:8080/authentication/register', ut)
      .subscribe((res) => {
        console.log(res);
      });
  }

  onAddTransaction(transaction: BankTransaction) {
    this.http
      .post<BankTransaction>('http://localhost:3000/transazioni', transaction)
      .subscribe(() => {

        this.http
        .get<utente>('http://localhost:3000/utenti', {
          params: {
            id: transaction.idUt,
          },
        })
        .subscribe((res) => {
          console.log(res);
         res[0].saldo=res[0].saldo+transaction.amount;
         this.http.put<utente>('http://localhost:3000/utenti', res[0]).subscribe((res)=>console.log("caricato"))

        });


        alert('Caricato');
      });
  }
}
