import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cardHolderName: string = 'Giuseppe Bezos';
  bankName: string = 'Bank';
  cardNumber: string = '1234 5678 9012 3456';
  cardDate: Date = new Date();
  secretCvc: string = '123'


  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSignUpNow() {
    this.router.navigate(['/signUp']);
  }

  onUserLogin() {
    this.router.navigate(['/login']);
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
