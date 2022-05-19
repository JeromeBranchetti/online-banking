import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  bankTransferChoice: boolean = false;
  phoneTopUp: boolean = false;

  bankTransferForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    iban: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  onBankTransfer() {
    this.bankTransferChoice = true;
    this.phoneTopUp = false;
  }

  onPhoneTopUp() {
    this.bankTransferChoice = false;
    this.phoneTopUp = true;
  }
}
