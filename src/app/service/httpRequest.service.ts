import { response } from './../class/response.mode';
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
import { BehaviorSubject, Subject } from 'rxjs';
import { RequestModel } from '../admin-dash-board/admin-dash-board.component';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  utente: utente;
  conti!: conto[];
  transaction: BankTransaction[];
  conto!: conto;
  modifyAccount = new conto(0);
  bar = new BehaviorSubject<boolean>(false);
  temporanyBalanceFlag = new BehaviorSubject<number>(0);
  temporanyBalance: number;
  userList = new BehaviorSubject<utente[]>([]);
  message = new BehaviorSubject<string>('');
  errorFlag = new BehaviorSubject<boolean>(null);

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
      .get<conto>('http://localhost:8080/api/account/' + id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.token.token,
        }),
      })
      .subscribe((res) => {
        this.US.idCont = res.id;
        this.US.Attivo = res.state;
        this.conto = res;
        this.conto.iban = res.iban;
        this.temporanyBalanceFlag.next(res.balance);
        this.temporanyBalance = res.balance;
        this.sign.bsconto.next(this.conto);
        this.modifyAccount = this.conto;
        this.temporanyBalanceFlag.next(this.conto.balance);
        this.temporanyBalance = this.conto.balance;
      });
  }

  onGetUser() {
    return this.http.get<utente[]>('http://localhost:8080/api/auth/users', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.auth.token.token,
      }),
    });
  }

  GetUserid(id: string) {
    this.US.idUt = id;
    this.http
      .get<utente>('http://localhost:8080/api/auth/users/' + id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.token.token,
        }),
      })
      .subscribe((res) => {
        this.utente = res;
        this.sign.bs.next(this.utente);
      });
  }

  GetUser(ema: string, pass: string) {
    this.http
      .post<utente>('http://localhost:8080/api/auth/userdetails', {
        email: ema,
        password: pass,
      })
      .subscribe((response) => {
        this.utente = response;

        this.sign.bs.next(this.utente);
        this.US.idUt = response.id;
        this.root.navigate(['/home-page-guest'], {
          queryParams: {
            idUt: this.US.idUt,
            idCont: this.US.idCont,
          },
        });
      });
  }

  onGetTransaction() {
    return this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/api/transaction/' +
          this.conto.id +
          '/transactions',
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetTransactionFilteredTen() {
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/api/transaction/last_ten_operation/' +
          this.conto.id,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetTransactionFilteredTwenty() {
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/api/transaction/last_twenty_operation/' +
          this.conto.id,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetTransactionFilteredFifty() {
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/api/transaction/last_fifty_operation/' +
          this.conto.id,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetTransactionFilterWithdrawal(
    idAccount: number,
    transactionNumber: string
  ) {
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/api/transaction/filter/prelievo/' +
          idAccount +
          '/last_' +
          transactionNumber,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetTransactionFilterDeposit(idAccount: number, transactionNumber: string) {
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/api/transaction/filter/deposito/' +
          idAccount +
          '/last_' +
          transactionNumber,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetTransactionFilterPhoneTopUp(
    idAccount: number,
    transactionNumber: string
  ) {
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/api/transaction/filter/ricarica_telefonica/' +
          idAccount +
          '/last_' +
          transactionNumber,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetTransactionFilterTransfer(idAccount: number, transactionNumber: string) {
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/api/transaction/filter/bonifico/' +
          idAccount +
          '/last_' +
          transactionNumber,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetRequest() {
    return this.http.get<RequestModel[]>(
      'http://localhost:8080/api/account/accounts/requests',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.token.token,
        }),
      }
    );
  }

  richiestaAttivazioneConto(amount: number) {
    this.http
      .get<conto>(
        'http://localhost:8080/api/account/' +
          this.utente.id +
          '/addAccount/' +
          this.conto.accountNumber +
          '/' +
          amount,

        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe({
        next: (res) => {
          this.http.get(
            'http://localhost:8080/api/account/accounts/activation_request/' +
              res.id,
            {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.auth.token.token,
              }),
            }
          );
          alert('richiesta inviata');
        },
        error: (errorRes: HttpErrorResponse) => {
          alert(errorRes.error.message);
        },
      });
  }

  onAddUser(ut: utente) {
    this.http
      .post('http://localhost:8080/authentication/register', ut, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.token.token,
        }),
      })
      .subscribe((res) => {
        res;
      });
  }
  changepass(pass: string) {
    this.utente.password = pass;

    let obj = {
      password: this.utente.password,
      id: this.utente.id,
    };

    this.http
      .put(
        'http://localhost:8080/api/auth/users/update/password',
        obj,

        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe(() => this.root.navigate(['/login']));
  }

  changemail(email: string) {
    this.utente.email = email;
    this.http
      .put(
        'http://localhost:8080/api/auth/users/update/email',
        { id: this.utente.id, email: this.utente.email },

        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe(() => this.root.navigate(['/login']));
  }

  onAddTransaction(transaction: BankTransaction) {
    this.http
      .post(
        'http://localhost:8080/api/transaction/make/transaction',
        transaction,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
          responseType: 'text',
        }
      )
      .subscribe({
        next: (res) => {
          this.errorFlag.next(false);
          this.message.next(res);
          this.temporanyBalance = this.temporanyBalance + transaction.amount;
          this.temporanyBalanceFlag.next(this.temporanyBalance);
        },
        error: (error) => {
          this.errorFlag.next(true);
          this.message.next(error.error);
        },
      });
  }

  onAddTransactionPhone(transaction: BankTransaction) {
    this.http
      .post(
        'http://localhost:8080/api/transaction/ricarica_telefonica',
        transaction,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
          responseType: 'text',
        }
      )
      .subscribe({
        next: (res) => {
          this.errorFlag.next(false);
          this.message.next(res);
          this.temporanyBalance = this.temporanyBalance - transaction.amount;
          this.temporanyBalanceFlag.next(this.temporanyBalance);
        },
        error: (error) => {
          this.errorFlag.next(true);
          this.message.next(error.error);
        },
      });
  }

  onAddTransactionTransfer(transaction: BankTransaction) {
    this.http
      .post('http://localhost:8080/api/transaction/transfer', transaction, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.token.token,
        }),
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          this.errorFlag.next(false);
          this.message.next(res);
          this.temporanyBalance = this.temporanyBalance - transaction.amount;
          this.temporanyBalanceFlag.next(this.temporanyBalance);
        },
        error: (error) => {
          this.errorFlag.next(true);
          this.message.next(error.error);
        },
      });
  }

  onActivateAccount(idConto: number) {
    this.http
      .get('http://localhost:8080/api/account/activation/accounts/' + idConto, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.token.token,
        }),
      })
      .subscribe(() => {});
  }

  onDisactivateAccount(idConto: number) {
    this.http
      .get(
        'http://localhost:8080/api/account/inactivation/accounts/' + idConto,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe(() => {});
  }

  richiestaChiusuraConto(idConto: number) {
    this.conto.state = 'CLOSURE_REQUEST';
    this.http
      .get(
        'http://localhost:8080/api/account/closure_request/accounts/' + idConto,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe(() => alert('richiesta chiusura inviata'));
  }

  onPrepareRequestList() {
    this.onGetUser().subscribe((res) => {
      this.userList.next(res);
    });
  }
}
