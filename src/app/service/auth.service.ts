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
      'Si è verificato un errore sconosciuto, sembra che non ti trovi nella pagina giusta' +
      'Per favore naviga ancora nel nostro sito attraverso i bottoni che ti sono forniti',
    status: 'Percorso errato',
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
      .post<AuthResponse>('http://localhost:8080/api/auth/auth', {
        email: email,
        password: password,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          // Se non è amministratore
          this.accessToken = response.access_token;
          this.loggedIn.next(true);
          this.authenticated = true;
          // this.router.navigate(['/home-page-guest']);
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
