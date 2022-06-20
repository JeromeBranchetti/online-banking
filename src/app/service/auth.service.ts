
import { utente } from './../class/utente';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { response } from '../class/response.mode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new Subject<boolean>();
  authenticated: boolean = false;
  administrator: boolean = false;

  error = {
    message:
      'Si è verificato un errore sconosciuto, sembra che non ti trovi nella pagina giusta' +
      'Per favore naviga ancora nel nostro sito attraverso i bottoni che ti sono forniti',
    status: 'Percorso errato',
  };

  token: response = null;
  autoExit = new Subject<void>();
  tokenExpirationTimer: any;
  accessToken: string = null;

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated() {
    const promise = new Promise((resolve, rejects) => {
      resolve(this.authenticated);
    });
    return promise;
  }

  login(email: string, password: string) {
    return this.http
      .post<response>('http://localhost:8080/api/auth/auth', {
        email: email,
        password: password,
      })
    }
     

  onCheckAdmin(email: string, password: string) {
    this.http
      .post<utente>(
        'http://localhost:8080/api/auth/userdetails',
        { email: email, password: password },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.token
          }),
        }
      )
      .subscribe((res) => console.log(res));
  }
}
