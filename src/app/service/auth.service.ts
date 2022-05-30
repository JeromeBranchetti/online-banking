import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class AuthResponse {
  token: string;
  refreshToken: string;
  refreshTokenExpireIn: number;
  tokenExpireIn: number;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
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
      resolve(this.loggedIn);
    });
    return promise;
  }

  // Chiamata per il login

  login(email: string, password: string) {
    this.http
      .post<AuthResponse>('http://localhost:8082/api/authenticate', {
        email: email,
        password: password,
      })
      .subscribe({
        next: (response) => {
          this.accessToken = response.token;
          console.log(this.accessToken);
          this.loggedIn = true;
          this.router.navigate(['/userDashboard']);
          localStorage.setItem('token', JSON.stringify(response));
          //   this.autoLogout(response.tokenExpireIn);
        },
        error: (errorRes) => {
          this.router.navigate(['/error']);
          this.error = errorRes.error;
        },
      });
  }
}
