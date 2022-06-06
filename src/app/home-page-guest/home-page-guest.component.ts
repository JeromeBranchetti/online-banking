import { SignUpService } from './../service/signUp.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { conto } from '../class/conto';

@Component({
  selector: 'app-home-page-guest',
  templateUrl: './home-page-guest.component.html',
  styleUrls: ['./home-page-guest.component.css'],
})
export class HomePageGuestComponent implements OnInit {

  conti: conto[] = [
    new conto(50000),
    new conto(1000000),
    new conto(999999)
    
  ];

  constructor(private router: Router, private Sus: SignUpService) {}

  ngOnInit(): void {
    this.Sus.bsconto.subscribe((res) => {
      this.conti = res;
    });
  }

  toPayment() {
    this.router.navigate(['/payment']);
  }

  toConto() {
    this.router.navigate(['/userDashboard'])
  }

}
