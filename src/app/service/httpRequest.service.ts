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

  onSearchUser() {
    this.http
      .get<utente[]>('http://localhost:8080/authentication/utenti', {
        headers: new HttpHeaders({
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKdWFuQzIyIiwiZXhwIjoxNjUzNTA2NzkxLCJpYXQiOjE2NTM0ODg3OTF9.i322AjoFUpGwkTjAdPemWb0LCK5hKVrGy6pPJw5JHTNVNr2oBAr9SJJFV7UT-N87mTBQzGFJ5MKhc986ZN54Tg',
        }),
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  onLogin() {
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
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKdWFuQzIyIiwiZXhwIjoxNjUzNTA2NzkxLCJpYXQiOjE2NTM0ODg3OTF9.i322AjoFUpGwkTjAdPemWb0LCK5hKVrGy6pPJw5JHTNVNr2oBAr9SJJFV7UT-N87mTBQzGFJ5MKhc986ZN54Tg',
        }),
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
