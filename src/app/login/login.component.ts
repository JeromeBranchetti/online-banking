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
        if (this.auth.authenticated) {
          this.http.GetUser(email, password);
        }

        // Se è amministratore
        // this.administrator = true;
        // this.router.navigate(['/adminDashboard])
      },
      error: (errorRes) => {
        this.auth.error = errorRes.error;
        alert(errorRes.error.message);
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
