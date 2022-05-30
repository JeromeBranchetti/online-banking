import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foot-bar',
  templateUrl: './foot-bar.component.html',
  styleUrls: ['./foot-bar.component.css'],
})
export class FootBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onDashBoard() {
    this.router.navigate(['/userDashboard']);
  }
  onPayment() {
    this.router.navigate(['/payment']);
  }
  onMovementDetail() {
    this.router.navigate(['/account-detail']);
  }
}
