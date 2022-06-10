import { RequestModel } from './../admin-dash-board/request.model';
import { TransactionService } from './transaction.service';
import { BankTransaction } from './../class/bankTransaction.model';
import { SignUpService } from './signUp.service';

import { AuthService } from './auth.service';
import { utente } from './../class/utente';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
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
        this.US.idCont = res[0].id;
        this.conto = res[0];
        this.conto.iban =
          'IT000000000000' +
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
    if(!ema.includes("@dipendente.it")){
    this.http
      .get<utente>('http://localhost:3000/utenti', {
        params: { email: ema, password: pass },
      })
      .subscribe({
        next: (response) => {
          response;
          console.log(response);
          this.US.idUt = response[0].id;
          this.root.navigate(['/home-page-guest'], {
            queryParams: {
              idUt: this.US.idUt,
              idCont: this.US.idCont,
            },
          });
        }
      });
  }
  else{
    this.http
      .get<utente>('http://localhost:3000/dipendenti', {
        params: { email: ema, password: pass },
      })
      .subscribe(
         (response) => {
          response;
          console.log(response);
          
           this.root.navigate(['/adminDashboard'], {
          //   queryParams: {
          //     idUt: this.US.idUt,
          //     idCont: this.US.idCont,
          //   },
          // });
        }) });

  }
}

  // GetUser(ema: string, pass: string) {
  //   //utente appena loggato
  //   this.http
  //     .get<utente>('http://localhost:3000/utenti', {
  //       params: { email: ema, password: pass },
  //     })
  //     .subscribe((res) => {
  //       res;
  //       this.US.idUt = res[0].id;
  //       this.auth.loggedIn.next(true);
  //       this.root.navigate(['/adminDashboard'], {
  //         queryParams: {
  //           idUt: this.US.idUt,
  //           idCont: this.US.idCont,
  //         },
  //       });
  //     });
  // }

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
    'Get: ' + this.token;
    return this.http.get<utente[]>('http://localhost:3000/utenti', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    });
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
        res;
      });
  }

  onGetRequest() {
    return this.http.get<RequestModel[]>('http://localhost:3000/richieste');
  }

  // Chiamate post

  onAddUser(ut: utente) {
    // utente iscritto

    ut;
    this.http
      .post('http://localhost:8080/authentication/register', ut)
      .subscribe((res) => {
        res;
      });
  }
  changepass(pass:string){
    this.http
    .get<utente>('http://localhost:3000/utenti', {
      params: {
        id: this.US.idUt,
      },
    })
    .subscribe((res) => {
      this.utente = res[0];})
      console.log(this.utente[0])
      this.utente[0].password=pass;
    this.http
              .put<utente>('http://localhost:3000/utenti/' + this.utente[0].id, this.utente[0])
              .subscribe((res) => 'caricato');


  }

  changemail(email:string){
    this.http
    .get<utente>('http://localhost:3000/utenti', {
      params: {
        id: this.US.idUt,
      },
    })
    .subscribe((res) => {
      this.utente = res[0];})
      console.log(this.utente[0])
      this.utente[0].email=email;
    this.http
              .put<utente>('http://localhost:3000/utenti/' + this.utente[0].id, this.utente[0])
              .subscribe((res) => 'caricato');


  }
  onAddTransaction(transaction: BankTransaction) {
    this.http
      .post<BankTransaction>('http://localhost:3000/transazioni', transaction)
      .subscribe(() => {
        this.http
          .get<conto>('http://localhost:3000/conti/' + transaction.idConto, {})
          .subscribe((res) => {
            res;
            res.saldo = res.saldo + transaction.amount;
            this.http
              .put<conto>('http://localhost:3000/conti/' + res.id, res)
              .subscribe((res) => 'caricato');
          });
      });
  }
}
