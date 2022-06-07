import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage = this.auth.error.message;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.router.navigate(['']);
    // }, 20000);
  }

  navigateToHomePage() {
    this.router.navigate(['']);
  }
}
