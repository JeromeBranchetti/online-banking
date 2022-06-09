import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SpioneService } from '../service/spione.service';
import { UtenteService } from '../service/utente.service';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css'],
})
export class AppBarComponent implements OnInit {
  eyeOpen: boolean = false;
  homeButtonVisible!: boolean;

  constructor(
    private spioneService: SpioneService,
    private router: Router,
    private authService: AuthService,
    private US:UtenteService
  ) {}

  ngOnInit(): void {
    this.spioneService.SpioneMode(this.eyeOpen);
    this.authService.loggedIn.subscribe((response) => {
      this.homeButtonVisible = response;
    });
  }

  openCloseToggle() {
    this.eyeOpen = !this.eyeOpen;
    this.spioneService.SpioneMode(this.eyeOpen);
  }

  logOut() {
    this.router.navigate(['/']);
    this.authService.loggedIn.next(false);
    this.authService.authenticated=false;
    this.US.idCont=null;
    this.US.idUt=null;
  }

  toHome() {
    this.router.navigate(['/']);
  }

  toHomeGuestPage() {
    this.router.navigate(['/home-page-guest'], {
      queryParams: {
      idUt:this.US.idUt , idCont:this.US.idCont}
      },);
  }
}
