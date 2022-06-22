import { HttpRequestService } from './../service/httpRequest.service';

import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UtenteService } from '../service/utente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login_form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private auth: AuthService,
    private location: Location,
    private US: UtenteService,
    private http: HttpRequestService
  ) {}

  ngOnInit(): void {}

  login(email: string, password: string) {
    this.auth.login(email, password).subscribe({
      next: (response) => {
        this.auth.token = response;
        this.auth.loggedIn.next(true);
        this.auth.authenticated = true;
        this.auth.isAuthenticated();

        if (response.role === 'ROLE_EMPLOYEE') {
          this.http.onPrepareRequestList();
          this.auth.administrator = true;
          this.auth.token = response;
          this.auth.loggedIn.next(true);
          this.auth.authenticated = true;
          this.auth.isAuthenticated();
          this.router.navigate(['/adminDashboard']);
        } else if (this.auth.authenticated && response.role === 'ROLE_CLIENT') {
          this.http.GetUser(email, password);
        }

        // Se è amministratore
        // this.administrator = true;
      },
      error: (errorRes) => {
        this.auth.error = errorRes.error;
        alert('Email o Password errati');
      },
    });
  }

  delete() {
    this.login_form.reset();
  }

  switch() {
    this.router.navigate(['signUp']);
  }

  backButton() {
    this.location.back();
  }
}
