import { UtenteService } from './utente.service';

import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { conto } from '../class/conto';
import { utente } from '../class/utente';
import { response } from '../class/response.mode';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private us: UtenteService
  ) {}

  bs: BehaviorSubject<utente> = new BehaviorSubject<utente>(null);
  bsconto: BehaviorSubject<conto> = new BehaviorSubject<conto>(null);
  token: string;

  newUtente(x: FormGroup) {
    let ut = utente.factory();
    ut = Object.assign(ut, x.value);

    this.bs.next(ut);

    this.onAddUser(ut);
  }

  onAddUser(ut: utente) {
    this.http
      .post<response>('http://localhost:8080/api/auth/register', ut)
      .subscribe((res) => {
        this.token = res.token;
        this.us.idUt = res.userId;
        this.auth.isAuthenticated();
        this.auth.authenticated = true;

 this.http.post<response>('http://localhost:8080/api/auth/register', ut).subscribe((res)=>{
  this.auth.token=res;
  this.us.idUt=res.userId;
  this.auth.isAuthenticated();
  this.auth.authenticated = true;
       
  this.router.navigate(['/home-page-guest'], {
    queryParams: {
    idUt:this.us.idUt , idCont:this.us.idCont}
    },
 );
})


 


