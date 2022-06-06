import { BankTransaction } from './../class/bankTransaction.model';
import { SignUpService } from './signUp.service';

import { AuthService } from './auth.service';
import { utente } from './../class/utente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { conto } from '../class/conto';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  token: string;
  utente: utente;
  conti!: conto[];
  transaction: BankTransaction[];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private sign: SignUpService
  ) {}

  // Chiamate Get

  GetUserid(id: number) {
    this.http
      .get<utente>('', {
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
      .get<utente>('http://localhost:8082/api/userdetails', {
        params: { email: ema, password: pass },
      })
      .subscribe((res) => {
        console.log(res);
        this.utente = res;
        this.sign.bs.next(this.utente);
      });
  }

  GetConti(id: number) {
    //richiesta conti con id manca http e verifica params
    this.http
      .get<conto[]>('', {
        params: {
          id: id,
        },
      })
      .subscribe((res) => {
        console.log(res);
        this.conti = res;
        this.sign.bsconto.next(this.conti);
      });
  }

  onGetTransaction(idAccount: number, transactionNumber: number) {
    //richiesta transazioni con id manca http e verifica params
    console.log(idAccount);
    console.log(transactionNumber);
    // this.http
    //   .get<BankTransaction[]>('', {
    //     params: {
    //       idAccount: idAccount,
    //     },
    //   })
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.transaction = res;
    //   });
  }
  onGetUser() {
    console.log('Get: ' + this.token);
    this.http
      .get<utente[]>('http://localhost:8080/authentication/utenti', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  onGetAccount() {
    this.token = this.auth.token.token;
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
}
