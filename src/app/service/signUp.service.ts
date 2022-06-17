import { RequestModel } from './../admin-dash-board/request.model';

import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { conto } from '../class/conto';
import { utente } from '../class/utente';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  request: RequestModel;

  bs: BehaviorSubject<utente> = new BehaviorSubject<utente>(null);
  bsconto: BehaviorSubject<conto> = new BehaviorSubject<conto>(null);
  token!: string;

  newUtente(x: FormGroup) {
    let ut = utente.factory();
    ut = Object.assign(ut, x.value);

    this.bs.next(ut);

    this.onAddUser(ut);
  }

  onAddUser(ut: utente) {

    this.http.post('http://localhost:8080/utenti', ut).subscribe(() => {
      this.http
        .get<utente[]>('http://localhost:8080/utenti')
        .subscribe((utenti) => {
          let id = utenti[utenti.length - 1].id;
          let cont = new conto(0);

          cont.idUt = id;

          this.request = {
            type: 'Prima registrazione',
            firstName: ut.firstName,
            lastName: ut.lastName,
            dateOfBirth: ut.birthDate,
            email: ut.email,
            idCont: cont.id,
          };

          this.http
            .post('http://localhost:8080/richieste', this.request)
            .subscribe((res) => {
              console.log(res);
            });

          this.http.post('http://localhost:8080/conti', cont).subscribe(() => {
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
