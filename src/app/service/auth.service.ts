import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class AuthResponse {
  access_token: string;
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

  login(user: string, password: string) {
    this.http
      .post<AuthResponse>('http://localhost:8080/authentication/authenticate', {
        user: 'JuanC22',
        password: '1234',
      })
      .subscribe({
        next: (response) => {
          this.accessToken = response.access_token;
          this.loggedIn = true;
          this.router.navigate(['/admin-search']);
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
