import { AuthService } from './../service/auth.service';
import { HttpRequestService } from './../service/httpRequest.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  login(email: string, password: string) {
    this.auth.login(email, password);
    console.log('email: ' + email + ' password: ' + password);
    console.log('' + this.auth.loggedIn);
  }
  delete() {
    this.login_form.reset();
  }
  switch() {
    this.router.navigate(['signUp']);
  }
}
