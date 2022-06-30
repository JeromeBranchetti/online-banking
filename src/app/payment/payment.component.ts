import { SpioneService } from './../service/spione.service';
import { BankTransaction } from './../class/bankTransaction.model';
import { HttpRequestService } from './../service/httpRequest.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  // Variables

  @ViewChild('btnRef') bankTransferButton;

  bankTransferChoice: boolean = true;
  phoneTopUpChoice: boolean = false;
  bankWithdrawalChoice: boolean = false;
  bankDepositChoice: boolean = false;
  iban: string;
  date = new Date();
  balance: number;
  amount: number;
  themeLight: boolean;
  completeOperation: boolean = false;

  firstBankTransferForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
  });

  secondBankTransferForm = new FormGroup({
    iban: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[0-9]{12}$'),
    ]),
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern(new RegExp('[0-9]+[.,][0-9]*|[0-9]+')),
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
      Validators.pattern(new RegExp('[0-9]+[.,][0-9]*|[0-9]+')),
    ]),
  });

  bankWithdrawalForm = new FormGroup({
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern(new RegExp('[0-9]+[.,][0-9]*|[0-9]+')),
    ]),
  });

  bankDepositForm = new FormGroup({
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern(new RegExp('[0-9]+[.][0-9]*|[0-9]+')),
    ]),
  });

  constructor(
    private httpReq: HttpRequestService,
    private spyService: SpioneService
  ) {}

  ngOnInit(): void {
    this.httpReq.temporanyBalanceFlag.subscribe((res) => {
      this.balance = res;
    });
    this.iban = this.httpReq.conto.iban;
    this.spyService.activatedEmitter.subscribe((res) => {
      this.themeLight = res;
    });
    this.httpReq.errorFlag.subscribe((res) => {
      if (res !== null) {
        this.completeOperation = true;
      }
    });
  }

  onBankTransfer() {
    this.bankTransferChoice = true;
    this.phoneTopUpChoice = false;
    this.bankDepositChoice = false;
    this.bankWithdrawalChoice = false;
    this.firstPhoneTopUpForm.reset();
    this.secondPhoneTopUpForm.reset();
    this.bankWithdrawalForm.reset();
    this.bankDepositForm.reset();
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
  }

  onDecomposeIban() {
    this.iban = this.secondBankTransferForm.get('iban').value;
    this.iban = this.iban.slice(0, 2) + ' ' + this.iban.slice(2);
    this.iban = this.iban.slice(0, 6) + ' ' + this.iban.slice(6);
    this.iban = this.iban.slice(0, 8) + ' ' + this.iban.slice(8);
    this.iban = this.iban.slice(0, 12) + ' ' + this.iban.slice(12);
  }

  onFixedAmount(amount: number) {
    this.amount = +amount.toFixed(2);
  }

  onBankTransferSubmit() {
    let transaction: BankTransaction;
    transaction = {
      amount: +(this.secondBankTransferForm.get('amount').value * +1).toFixed(
        2
      ),
      causal:
        'Bonifico da: ' +
        this.httpReq.utente.firstName +
        ' ' +
        this.httpReq.utente.lastName +
        ' a: ' +
        this.firstBankTransferForm.get('firstName').value +
        ' ' +
        this.firstBankTransferForm.get('lastName').value,
      destinationIban: this.secondBankTransferForm.get('iban').value,
      originIban: this.httpReq.conto.iban,
    };

    this.httpReq.onAddTransactionTransfer(transaction);

    this.bankTransferChoice = false;
    this.firstBankTransferForm.reset();
    this.secondBankTransferForm.reset();
  }

  onPhoneTopUpSubmit() {
    let transaction: BankTransaction;
    transaction = {
      amount: +(this.secondPhoneTopUpForm.get('amount').value * +1).toFixed(2),
      causal:
        'Ricarica telefonica a: ' +
        this.firstPhoneTopUpForm.get('phoneNumber').value,
      accountId: this.httpReq.conto.id,
    };
    this.httpReq.onAddTransactionPhone(transaction);

    this.phoneTopUpChoice = false;
    this.firstPhoneTopUpForm.reset();
    this.secondPhoneTopUpForm.reset();
  }

  onBankDepositSubmit() {
    let transaction: BankTransaction;
    transaction = {
      amount: +(this.bankDepositForm.get('amount').value * +1).toFixed(2),
      causal: 'Deposito online',
      accountId: this.httpReq.conto.id,
    };
    this.httpReq.onAddTransaction(transaction);
    this.bankDepositChoice = false;
    this.bankDepositForm.reset();
  }

  onBankWithdrawalSubmit() {
    let transaction: BankTransaction;
    transaction = {
      amount: this.bankWithdrawalForm.get('amount').value * -1,
      causal: 'Prelievo online',
      accountId: this.httpReq.conto.id,
    };
    this.httpReq.onAddTransaction(transaction);
    this.bankWithdrawalChoice = false;
    this.bankWithdrawalForm.reset();
  }
}
