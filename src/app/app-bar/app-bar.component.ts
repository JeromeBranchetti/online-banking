import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SpioneService } from '../service/spione.service';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css'],
})
export class AppBarComponent implements OnInit {
  eyeOpen: boolean = true;
  homeButtonVisible!: boolean;

  constructor(
    private spioneService: SpioneService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.spioneService.SpioneMode(this.eyeOpen);
    this.authService.loggedIn.subscribe((response)=>  {
      this.homeButtonVisible = response;
    })
  }

  openCloseToggle() {
    this.eyeOpen = !this.eyeOpen;
    this.spioneService.SpioneMode(this.eyeOpen);
  }

  logOut() {
    this.router.navigate(['/']);
  }

  toHome() {
    this.router.navigate(['/']);
  }

  toHomeGuestPage() {
    this.router.navigate(['/home-page-guest'])
  }
}
