import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  cardHolderName: string = 'Giuseppe Bezos';
  bankName: string = 'Bank';
  cardNumber: string = '1234 5678 9012 3456';
  cardDate: Date = new Date();
  secretCvc: string = '123'

  constructor() { }

  ngOnInit(): void {
  }

  expirationDateExtractor():string {
    const month = this.cardDate.getMonth();
    const year = this.cardDate.getFullYear();
    const yearDigits = year.toString().slice(2);
    return month + '/' + yearDigits;
  }

  lastfourDigitsExtractor():string {
    return this.cardNumber.toString().slice(-4);
  }

}
