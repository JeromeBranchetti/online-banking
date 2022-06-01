import { SignUpService } from './../service/signUp.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { utente } from '../class/utente';

@Component({
  selector: 'app-foot-bar',
  templateUrl: './foot-bar.component.html',
  styleUrls: ['./foot-bar.component.css'],
})
export class FootBarComponent implements OnInit {
  constructor(private router: Router, private Sus: SignUpService) {}
  guest!: utente;

  ngOnInit(): void {
    this.Sus.bs.subscribe((ut) => {
      this.guest = ut;
    });
  }

  onDashBoard() {
    this.router.navigate(['/userDashboard'], {
      queryParams: {
        user: this.guest.firstName + this.guest.lastName,
        id: this.guest.id,
      },
    });
  }
  onPayment() {
    this.router.navigate(
      ['/payment'],

      {
        queryParams: {
          user: this.guest.firstName + this.guest.lastName,
          id: this.guest.id,
        },
      }
    );
  }
  onMovementDetail() {
    this.router.navigate(['/account-detail'], {
      queryParams:{
         user:(this.guest.firstName + this.guest.lastName),
         id:this.guest.id
      }
    });
  }
}
