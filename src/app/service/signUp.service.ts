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

    this.http.post('http://localhost:8080/api/auth/register', ut).subscribe(() => {
      console.log("caricato");

    });
  }
}
