import { HttpRequestService } from './../service/httpRequest.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,private httpReq:HttpRequestService) {}

  ngOnInit(
  ): void {
    this.httpReq.bar.next(false);
  }

  onSignUpNow() {
    this.router.navigate(['/signUp']);
  }

  onUserLogin() {
    this.router.navigate(['/login']);
  }
  
}
