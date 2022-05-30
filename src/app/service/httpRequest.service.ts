import { utente } from './../class/utente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  token: string;
  utente: utente;

  constructor(private http: HttpClient) {}

  // Chiamate Get

  onGetUser() {
    console.log('Get: ' + this.token);
    this.token = JSON.stringify(this.token);
    this.token = this.token.substring(this.token.indexOf(':') + 2);
    this.token = this.token.substring(0, this.token.indexOf('"'));
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
    this.token = JSON.stringify(this.token);
    this.token = this.token.substring(this.token.indexOf(':') + 2);
    this.token = this.token.substring(0, this.token.indexOf('"'));
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

  onGetTransaction() {}

  // Chiamate Post

  onAddUser() {
    this.utente = utente.factory();
    this.http
      .post('http://localhost:8080/authentication/utenti', this.utente, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
