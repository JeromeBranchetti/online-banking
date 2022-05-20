import { BankTransaction } from './bankTransaction.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
  bankTransactions: BankTransaction[] = [
    {
      type: 'Pos',
      date: '20/05/2020',
      amount: 100,
      description: 'Paypal',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
