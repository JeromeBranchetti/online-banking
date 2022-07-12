import { SpioneService } from './../service/spione.service';
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
  theme: boolean = true;

  constructor(
    private router: Router,
    private httpReq: HttpRequestService,
    private spyMode: SpioneService
  ) {}

  ngOnInit(): void {
    this.httpReq.bar.next(false);
    this.spyMode.activatedEmitter.subscribe((res) => {
      this.theme = res;
    });
  }

  onSignUpNow() {
    this.router.navigate(['/signUp']);
  }

  onUserLogin() {
    this.router.navigate(['/login']);
  }
}
