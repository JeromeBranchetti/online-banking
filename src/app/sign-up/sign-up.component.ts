import { AuthService } from './../service/auth.service';
import { SignUpService } from '../service/signUp.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    public SUService: SignUpService,
    private router: Router,
    private auth: AuthService
  ) {}
  regex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^W]).{8,32}$');

  ngOnInit(): void {}
  signUp_form = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    birthDate: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(this.regex),
    ]),
  });

  controlDate(c: AbstractControl) {
    let birth = new Date(c.value);
    let today = new Date();

    if (today.getFullYear() - birth.getFullYear() > 18) {
      return { maggiorenne: true };
    } else if (today.getFullYear() - birth.getFullYear() < 18) {
      return false;
    } else if (today.getFullYear() - birth.getFullYear() === 18) {
      if (today.getMonth() - birth.getMonth() > 0) {
        return true;
      } else if (today.getMonth() - birth.getMonth() < 0) {
        return false;
      } else if (today.getMonth() - birth.getMonth() === 0) {
        if (today.getDay() - birth.getDay() > 0) {
          return false;
        } else if (today.getDay() - birth.getDay() < 0) {
          return false;
        } else if (today.getDay() === birth.getDay()) {
          return true;
        }
      }
    }

    return null;
  }

  delete() {
    this.signUp_form.reset();
  }

  signUp() {
    if (this.controlDate(this.signUp_form.get('birthDate'))) {
      this.SUService.newUtente(this.signUp_form);
      this.router.navigate([
        'home-page-guest',
        {
          queryParams: {
            user:
              this.signUp_form.get('firstName').value +
              this.signUp_form.get('lastName').value,
          },
        },
      ]);
    } else {
      alert('non sei maggiorenne');
    }
  }
}
