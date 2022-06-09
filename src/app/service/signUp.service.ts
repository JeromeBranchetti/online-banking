import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { conto } from '../class/conto';
import { utente } from '../class/utente';
import { UtenteService } from './utente.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private US:UtenteService


  ) {}

  bs: BehaviorSubject<utente> = new BehaviorSubject<utente>(null);
  bsconto: BehaviorSubject<conto> = new BehaviorSubject<conto>(null);
  token!: string;

  newUtente(x: FormGroup) {
    let ut = utente.factory();
    ut = Object.assign(ut, x.value);
    console.log(ut, 'signUp');

    this.bs.next(ut);

    this.onAddUser(ut);
  }

  onAddUser(ut: utente) {
    // utente iscritto
    // this.http
    //   .post('http://localhost:8080/authentication/register', ut)
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.auth.loggedIn.next(true);
    //     this.auth.authenticated = true;
    //     this.router.navigate([
    //       '/home-page-guest',
    //       {
    //         queryParams: {
    //           user: ut.firstName + ut.lastName,
    //         },
    //       },
    //     ]);
    //   });
    this.http.post('http://localhost:3000/richieste', ut).subscribe(() => {
      console.log('richiestas inviata');
    });
    this.http.post('http://localhost:3000/utenti', ut).subscribe(() => {
      this.http
        .get<utente[]>('http://localhost:3000/utenti')
        .subscribe((utenti) => {
          
          let id = utenti[utenti.length - 1].id;
          let cont = new conto(0);
          cont.idUt = id;
          this.http;

          this.http.post('http://localhost:3000/conti', cont).subscribe(() => {
            
            this.auth.authenticated = true;
            this.router.navigate(['/home-page-guest'], {
              queryParams: {
                user: ut.firstName + ut.lastName,
                idUt: id,
              },
            });
          });
        });
    });
  }
}
