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

  onGetUser() {
    console.log(this.token);
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

  onLogin() {
    console.log(this.token);
    this.http
      .post<string>('http://localhost:8080/authentication/authenticate', {
        username: 'JuanC22',
        password: '1234',
      })
      .subscribe((res) => {
        this.token = res;
        console.log(this.token);
      });
  }

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
