import { HttpRequestService } from './../service/httpRequest.service';
import { SignUpService } from '../service/signUp.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  completeOperation: boolean = false;

  constructor(
    public SUService: SignUpService,

    private httpReq: HttpRequestService,
    private location: Location
  ) {}
  regex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^W]).{8,32}$');

  ngOnInit(): void {
    this.httpReq.completeOperation.subscribe((res) => {
      if (res !== null) {
        this.completeOperation = res;
      }
    });
  }

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

    if (
      today.getFullYear() - birth.getFullYear() > 18 &&
      today.getFullYear() - birth.getFullYear() <= 100
    ) {
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
    } else {
      this.httpReq.completeOperation.next(true);
      this.httpReq.errorFlag.next(true);
      this.httpReq.message.next('Età non idonea');
    }
  }

  backButton() {
    this.location.back();
  }
}
