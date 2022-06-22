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
  userList = new Subject<utente[]>();

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

        this.sign.bsconto.next(this.conto);
        this.temporanyBalance = this.conto.balance;
        this.temporanyBalanceFlag.next(this.temporanyBalance);
        this.modifyAccount = this.conto;
      });
  }

  onGetUserId() {
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
    console.log(this.auth.token.token);
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/api/transaction/1/transactions',
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe((res) => {
        console.log(res);
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
        this.onChangeWords();
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
        this.onChangeWords();
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
        this.onChangeWords();
      });
  }

  onGetTransactionFilteredWord(transactionType: string) {
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/api/transaction/' +
          transactionType +
          '/transactions' +
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
        this.onChangeWords();
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

  onCheckRequest(idConto: number) {}

  // Chiamate post

  richiestaAttivazioneConto(amount: number) {
    this.http
      .post<conto>(
        'http://localhost:8080/api/account/' +
          this.utente.id +
          '/addAccount/' +
          this.conto.accountNumber +
          '/' +
          amount,
        null,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.http.put(
            'http://localhost:8080/api/account/accounts/activation_request/' +
              res.id,
            null,
            {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.auth.token.token,
              }),
            }
          );
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
      .post('http://localhost:8080/api/transaction/transaction', transaction, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.token.token,
        }),
        responseType: 'text',
      })
      .subscribe({
        next: () => {
          alert('Pagamento completato!');
          console.log(this.conto.balance);
          this.temporanyBalance = this.temporanyBalance + transaction.amount;
          this.temporanyBalanceFlag.next(this.temporanyBalance);
        },
        error: () => {
          alert('Errore durante il processo di pagamento');
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
        next: () => {
          alert('Pagamento completato!');
          this.temporanyBalance = this.temporanyBalance - transaction.amount;
          this.temporanyBalanceFlag.next(this.temporanyBalance);
        },
        error: () => {
          alert('Errore durante il processo di pagamento');
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
        next: () => {
          alert('Pagamento completato!');
          this.temporanyBalance = this.temporanyBalance - transaction.amount;
          this.temporanyBalanceFlag.next(this.temporanyBalance);
        },
        error: () => {
          alert('Errore durante il processo di pagamento');
        },
      });
  }

  onActivateAccount(idConto: number) {
    this.http.get('http://localhost:8080/richieste/');
  }

  onDisactivateAccount(idConto: number) {}

  onDeleteRequest(idRequest: number) {
    this.http
      .delete('http://localhost:8080/richieste/' + idRequest, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.token.token,
        }),
      })
      .subscribe((res) => {});
  }

  richiestaChiusuraConto(idConto: number) {
    this.http
      .put(
        'http://localhost:8080/api/account/accounts/closure_request/' + idConto,
        null,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token.token,
          }),
        }
      )
      .subscribe(() => console.log('richiesta chiusura inviata'));
  }

  // Altri metodi

  onChangeWords() {
    for (let transaction of this.transactionService.bankTransaction) {
      if (transaction.operationType === 'RICARICA_TELEFONICA') {
        transaction.operationType = 'Ricarica Telefonica';
      } else {
        transaction.operationType = transaction.operationType.toLowerCase();
      }
    }
  }

  onPrepareRequestList() {
    this.onGetUserId().subscribe((res) => {
      this.userList.next(res);
    });
  }
}
