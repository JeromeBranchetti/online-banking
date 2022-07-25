import { SpioneService } from './../service/spione.service';
import { HttpRequestService } from './../service/httpRequest.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fade-in', [
      state('void', style({ opacity: 0, transform: 'translateY(50px)' })),
      transition('void => *', [animate(400)]),
    ]),
    trigger('lift', [
      state('void', style({ transform: 'rotate(0deg)', top: '35%' , left: '40%' })),
      transition('void => *', [animate(800)]),
    ])
  ],
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
