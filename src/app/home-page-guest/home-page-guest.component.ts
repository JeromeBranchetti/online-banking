import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-guest',
  templateUrl: './home-page-guest.component.html',
  styleUrls: ['./home-page-guest.component.css']
})
export class HomePageGuestComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toPayment() {
    this.router.navigate(['/payment'])
  }

}
