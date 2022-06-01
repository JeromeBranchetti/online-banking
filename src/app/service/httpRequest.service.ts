import { AuthService } from './auth.service';
import { utente } from './../class/utente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  token: string;
  utente: utente;

  constructor(private http: HttpClient, private auth: AuthService) {}

  // Chiamate Get

  onGetUser() {
    this.token = this.auth.token.token;
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

  onGetTransaction() {}

  // Chiamate post

  onAddUser(ut: utente) {
    console.log(ut);
    this.http
      .post('http://localhost:8080/authentication/register', ut)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
