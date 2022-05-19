import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  bankTransferChoice: boolean = false;
  phoneTopUpChoice: boolean = false;

  bankTransferForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    iban: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
  });

  phoneTopUpForm = new FormGroup({
    telephoneNumber: new FormControl(null, Validators.required),
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

  onBankTransferSubmit() {}

  onPhoneTopUpSubmit() {}

  onCancel() {
    this.bankTransferForm.reset();
    this.phoneTopUpForm.reset();
  }
}
