import { UtenteService } from './../service/utente.service';
import { BankTransaction } from './../class/bankTransaction.model';
import { HttpRequestService } from './../service/httpRequest.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  // Variables

  bankTransferChoice: boolean = false;
  phoneTopUpChoice: boolean = false;
  bankWithdrawalChoice: boolean = false;
  bankDepositChoice: boolean = false;
  type: string;
  iban: string;
  date = new Date();

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

  bankWithdrawalForm = new FormGroup({
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$'),
    ]),
  });

  bankDepositForm = new FormGroup({
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$'),
    ]),
  });

  constructor(
    private httpReq: HttpRequestService,
    private utenteService: UtenteService
  ) {}

  ngOnInit(): void {}

  onBankTransfer() {
    this.bankTransferChoice = true;
    this.phoneTopUpChoice = false;
    this.bankDepositChoice = false;
    this.bankWithdrawalChoice = false;
    this.firstPhoneTopUpForm.reset();
    this.secondPhoneTopUpForm.reset();
    this.bankWithdrawalForm.reset();
    this.bankDepositForm.reset();
    this.type = 'transfer';
  }

  onBankWithdrawal() {
    this.bankWithdrawalChoice = true;
    this.phoneTopUpChoice = false;
    this.bankDepositChoice = false;
    this.bankTransferChoice = false;
    this.firstPhoneTopUpForm.reset();
    this.secondPhoneTopUpForm.reset();
    this.firstBankTransferForm.reset();
    this.secondBankTransferForm.reset();
    this.bankDepositForm.reset();
    this.type = 'withdrawal';
  }

  onBankDeposit() {
    this.bankDepositChoice = true;
    this.phoneTopUpChoice = false;
    this.bankTransferChoice = false;
    this.bankWithdrawalChoice = false;
    this.firstPhoneTopUpForm.reset();
    this.secondPhoneTopUpForm.reset();
    this.firstBankTransferForm.reset();
    this.secondBankTransferForm.reset();
    this.bankWithdrawalForm.reset();
    this.type = 'deposit';
  }

  onPhoneTopUp() {
    this.bankTransferChoice = false;
    this.phoneTopUpChoice = true;
    this.bankDepositChoice = false;
    this.bankWithdrawalChoice = false;
    this.firstBankTransferForm.reset();
    this.secondBankTransferForm.reset();
    this.bankWithdrawalForm.reset();
    this.bankDepositForm.reset();
    this.type = 'phoneTopUp';
  }

  onDecomposeIban() {
    this.iban = this.secondBankTransferForm.get('iban').value;
    this.iban = this.iban.slice(0, 2) + ' ' + this.iban.slice(2);
    this.iban = this.iban.slice(0, 5) + ' ' + this.iban.slice(5);
    this.iban = this.iban.slice(0, 7) + ' ' + this.iban.slice(7);
    this.iban = this.iban.slice(0, 12) + ' ' + this.iban.slice(12);
    this.iban = this.iban.slice(0, 17) + ' ' + this.iban.slice(17);
    this.iban = this.iban.slice(0, 22) + ' ' + this.iban.slice(22);
  }

  onBankTransferSubmit() {
    let transaction: BankTransaction;
    transaction = {
      type: this.type,
      date: this.date.toDateString(),
      amount: +this.secondBankTransferForm.get('amount').value * -1,
      description: 'Transfer',
      idConto: this.utenteService.idCont,
    };
    this.httpReq.onAddTransaction(transaction);
  }

  onPhoneTopUpSubmit() {
    let transaction: BankTransaction;
    transaction = {
      type: this.type,
      date: this.date.toDateString(),
      amount: +this.secondBankTransferForm.get('amount').value * -1,
      description: 'Phone Top Up',
      idConto: this.utenteService.idCont,
    };
    this.httpReq.onAddTransaction(transaction);
  }

  onBankDepositSubmit() {
    let transaction: BankTransaction;
    transaction = {
      type: this.type,
      date: this.date.toDateString(),
      amount: +this.secondBankTransferForm.get('amount').value * +1,
      description: 'Deposit',
      idConto: this.utenteService.idCont,
    };
    this.httpReq.onAddTransaction(transaction);
  }

  onBankWithdrawalSubmit() {
    let transaction: BankTransaction;
    transaction = {
      type: this.type,
      date: this.date.toDateString(),
      amount: +this.secondBankTransferForm.get('amount').value * -1,
      description: 'Withdrawal',
      idConto: this.utenteService.idCont,
    };
    this.httpReq.onAddTransaction(transaction);
  }
}
