import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthResponse } from '../model/authResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new Subject<boolean>();
  authenticated: boolean = false;
  administrator: boolean = false;

  error = {
    message:
      'An unknown error has occured, looks like you are not on the right page.' +
      'Please consider navigate again on our website through the right routes!',
    status: 'Unknown Route',
  };

  token: AuthResponse = null;
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
    this.http
      .post<AuthResponse>('http://localhost:8080/authentication/authenticate', {
        email: email,
        password: password,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          // Chiamata Get, tramite id accedo al ruolo dell'utente
          // Se non è amministratore
          this.accessToken = response.access_token;
          this.loggedIn.next(true);
          this.authenticated = true;
          this.router.navigate(['/home-page-guest']);
          // Se è amministratore
          // this.administrator = true;
          // this.router.navigate(['/adminDashboard])
        },
        error: (errorRes) => {
          this.router.navigate(['/error']);
          this.error = errorRes.error;
        },
      });
  }
}
