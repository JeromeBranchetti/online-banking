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
  // Variables

  bankTransferChoice: boolean = false;
  phoneTopUpChoice: boolean = false;

  iban: string;

  firstBankTransferForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
  });

  secondBankTransferForm = new FormGroup({
    iban: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{1,5}[0-9]{1,5}[0-9]{1,12}$'
      ),
    ]),
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$'),
    ]),
  });

  firstPhoneTopUpForm = new FormGroup({
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]{9,10}$'),
    ]),
    provider: new FormControl(null, [Validators.required]),
  });

  secondPhoneTopUpForm = new FormGroup({
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$'),
    ]),
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

  onDecomposeIban() {
    this.iban = this.secondBankTransferForm.get('iban').value;
    this.iban = this.iban.slice(0, 2) + ' ' + this.iban.slice(2);
    this.iban = this.iban.slice(0, 5) + ' ' + this.iban.slice(5);
    this.iban = this.iban.slice(0, 10) + ' ' + this.iban.slice(10);
    this.iban = this.iban.slice(0, 15) + ' ' + this.iban.slice(15);
    this.iban = this.iban.slice(0, 20) + ' ' + this.iban.slice(20);
  }

  onBankTransferSubmit() {}

  onPhoneTopUpSubmit() {}
}
