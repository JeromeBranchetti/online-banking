import { UserDashBoardComponent } from './../user-dash-board/user-dash-board.component';
import { HttpRequestService } from './../service/httpRequest.service';
import { UtenteService } from './../service/utente.service';
import { SignUpService } from './../service/signUp.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { utente } from '../class/utente';
import { AuthService } from '../service/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-foot-bar',
  templateUrl: './foot-bar.component.html',
  styleUrls: ['./foot-bar.component.css'],
  animations: [
    trigger('containerState', [
      state(
        'notLogged',
        style({
          dispay: 'none',
          transform: 'translateY(10vh)',
        })
      ),
      state(
        'loggedVisible',
        style({
          display: 'visible',
          trasform: 'translateY(0)',
        })
      ),
      transition('notLogged => loggedVisible', animate(400)),
      transition('loggedVisible => notLogged', animate(400)),
    ]),
  ],
})
export class FootBarComponent implements OnInit {
  homeButtonVisible!: boolean;
  guest!: utente;
  state = 'notLogged';
  constructor(
    private router: Router,
    private Sus: SignUpService,
    private authService: AuthService,
    private US: UtenteService,
    private ud:UserDashBoardComponent
  ) {}

  ngOnInit(): void {
    this.Sus.bs.subscribe((ut) => {
      this.guest = ut;
    });
    this.ud.bar.subscribe((response) => {
      this.homeButtonVisible = response;
      this.homeButtonVisible
        ? (this.state = 'loggedVisible')
        : (this.state = 'notLogged');
    });
  }

  onDashBoard() {
    this.router.navigate(['/userDashboard'], {
       queryParams: {
       idUt:this.US.idUt , idCont:this.US.idCont}
       },
    );
  }

  onPayment() {
    if(this.US.Attivo){
    this.router.navigate(
      ['/payment']
      , {
        queryParams: {
        idUt:this.US.idUt , idCont:this.US.idCont}
        },
     
    );
      }
      else{
        alert("conto non attivo")
      }
  }
  onMovementDetail() {
    if(this.US.Attivo){
    this.router.navigate(['/account-detail'], {
     
        queryParams: {
        idUt:this.US.idUt , idCont:this.US.idCont}
        },
    );
  }

else{

  alert("conto non attivo!")
}
}
}
