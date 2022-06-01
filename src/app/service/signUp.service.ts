
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

  constructor(private http: HttpClient) {}

  bs: BehaviorSubject<utente> = new BehaviorSubject<utente>(null);
  bsconto: BehaviorSubject<conto[]>=new BehaviorSubject<conto[]>(null);
  token!: string;

  newUtente(x: FormGroup) {
    let ut = utente.factory();
    ut = Object.assign(ut, x.value);
    console.log(ut,"signUp")

    this.bs.next(ut);

    this.onAddUser(ut);
    
  }
  onAddUser(ut: utente) {  // utente iscritto
   
    console.log(ut)
    this.http
      .post('http://localhost:8080/authentication/register', ut)
      .subscribe((res) => {
        console.log(res);
      });
  }
}

 

