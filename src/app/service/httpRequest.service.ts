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

  // Chiamate post

  onAddUser(ut: utente) {
    let user = {
      firstName: 'Christian',
      lastName: 'Kareem',
      email: 'Christian.Kareem@test.it',
      birthDate: '15/02/1995',
      password: 'Abcd1234!',
    };
    this.http
      .post('http://localhost:8080/authentication/register', user)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
