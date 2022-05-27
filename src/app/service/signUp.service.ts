import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { utente } from '../class/utente';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  bs: BehaviorSubject<utente> = new BehaviorSubject<utente>(null);
  token!: string;

  newUtente(x: FormGroup) {
    let ut = utente.factory();
    ut = Object.assign(ut, x.value);

    this.bs.next(ut);

    this.sendServer(ut);
  }

  onLogin() {
    this.http
      .post<string>('http://localhost:8080/authentication/authenticate', {
        username: 'JuanC22',
        password: '1234',
      })
      .subscribe((res) => {
        this.token = res;
        this.token = JSON.stringify(this.token);
        this.token = this.token.substring(this.token.indexOf(':') + 2);
        this.token = this.token.substring(0, this.token.indexOf('"'));
      });
  }

  sendServer(ut: utente) {
    this.http
      .post('http://localhost:8080/authentication/utenti', ut, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
        }),
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
