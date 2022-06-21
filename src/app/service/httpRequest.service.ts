import { RequestModel } from './../admin-dash-board/request.model';
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
  modifyAccount = new conto(0);

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
        console.log('res conto:', res);
        this.US.idCont = res.id;
        this.US.Attivo = res.state;
        this.conto = res;
        this.conto.iban = res.iban;

        this.sign.bsconto.next(this.conto);
        this.modifyAccount = this.conto;
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
        console.log('res getuserid:', res);
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
        console.log(response);
        this.utente = response;
        console.log(this.utente);
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
    let idConto = this.US.idCont;
    return this.http.get<BankTransaction[]>(
      'http://localhost:8080/transazioni/?idConto=' + idConto,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      }
    );
  }

  onGetTransactionFiltered(filter: number) {
    let idConto = this.US.idCont;
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/transazioni/?idConto=' +
          idConto +
          '&_limit=' +
          filter,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.token,
          }),
        }
      )
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetTransactionFilteredWord(transactionType: string) {
    let idConto = this.US.idCont;
    this.http
      .get<BankTransaction[]>(
        'http://localhost:8080/transazioni/?idCont=' +
          idConto +
          '&type=' +
          transactionType,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.token,
          }),
        }
      )
      .subscribe((res) => {
        this.transactionService.bankTransaction = res;
        this.transactionService.bankTransactionFlag.next(res);
      });
  }

  onGetUser() {
    this.token = this.auth.token.token;
    'Get: ' + this.token;
    return this.http.get<utente[]>('http://localhost:8080/utenti', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    });
  }

  onGetRequest() {
    return this.http.get<RequestModel[]>(
      'http://localhost:8080/richieste/?_limit=' + 10,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      }
    );
  }

  onCheckRequest(idConto: number) {
    console.log(idConto);
    return this.http.get<RequestModel[]>(
      'http://localhost:8080/richieste/?idCont=' + idConto,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      }
    );
  }

  // Chiamate post

  addConto() {
    this.http
      .get<utente[]>(
        'http://localhost:8080/api/account/' +
          this.utente.id +
          '/addAccount/' +
          this.conto.id +
          '/' +
          1,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.token,
          }),
        }
      )
      .subscribe((utenti) => {
        let id = utenti[utenti.length - 1].id;
        let cont = new conto(0);
        let request;

        cont.userId = id;

        this.http
          .post('http://localhost:8080/conti', cont, {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + this.token,
            }),
          })
          .subscribe(() => {});

        this.http
          .get<conto>(
            'http://localhost:8080/conti/?numero_conto=' + cont.accountNumber,
            {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
              }),
            }
          )
          .subscribe((res) => {
            request = {
              type: 'Apertura nuovo conto',
              firstName: this.utente.firstName,
              lastName: this.utente.lastName,
              dateOfBirth: this.utente.birthDate,
              email: this.utente.email,
              idCont: res.id,
            };

            this.http
              .post('http://localhost:8080/richieste', request, {
                headers: new HttpHeaders({
                  Authorization: 'Bearer ' + this.token,
                }),
              })
              .subscribe((res) => {});
          });
      });
  }
  onAddUser(ut: utente) {
    this.http
      .post('http://localhost:8080/authentication/register', ut, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      })
      .subscribe((res) => {
        res;
      });
  }
  changepass(pass: string) {
    this.utente.password = pass;
    console.log(this.utente);
    this.http
      .put<utente>(
        'http://localhost:8080/api/auth/users/update',
        this.utente,

        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.token,
          }),
        }
      )
      .subscribe(() => this.root.navigate(['/login']));
  }

  changemail(email: string) {
    this.utente.email = email;
    console.log(this.utente);
    this.http
      .put<utente>(
        'http://localhost:8080/api/auth/users/update/',
        this.utente,

        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.token,
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
        },
        error: () => {
          alert('Errore durante il processo di pagamento');
        },
      });
  }

  onAddTransactionPhone(transaction: BankTransaction) {
    console.log(transaction);

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
        },
        error: () => {
          alert('Errore durante il processo di pagamento');
        },
      });
  }

  onAddRequest(request: RequestModel) {
    this.http
      .post<RequestModel>('http://localhost:8080/richieste', request, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      })
      .subscribe((res) => {});
  }

  // Chiamate put

  onCompleteRequest(result: boolean, idConto: number) {
    this.GetConto(idConto.toString());
    this.modifyAccount.state = result;
    this.http
      .put('http://localhost:8080/conti/' + idConto, this.modifyAccount, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      })
      .subscribe((res) => {
        alert('Richiesta completata');
      });
  }

  // Chiamate Delete

  onDeleteRequest(idRequest: number) {
    this.http
      .delete('http://localhost:8080/richieste/' + idRequest, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      })
      .subscribe((res) => {});
  }
}
