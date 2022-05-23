import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  bankTransferChoice: boolean = false;
  phoneTopUpChoice: boolean = false;
  isLinear: boolean = true;

  bankTransferForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    iban: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
  });

  phoneTopUpForm = new FormGroup({
    phoneNumber: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  onBankTransfer() {
    this.bankTransferChoice = true;
    this.phoneTopUpChoice = false;
  }

  onPhoneTopUp() {
    this.bankTransferChoice = false;
    this.phoneTopUpChoice = true;
  }

  onNextForm() {
    this.isLinear = true;
  }

  onBankTransferSubmit() {}

  onPhoneTopUpSubmit() {}

  onCancel() {
    this.bankTransferForm.reset();
    this.phoneTopUpForm.reset();
  }
}
