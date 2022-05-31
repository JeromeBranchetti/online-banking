import { HttpRequestService } from './httpRequest.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { utente } from '../class/utente';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private httpReq: HttpRequestService) {}

  bs: BehaviorSubject<utente> = new BehaviorSubject<utente>(null);
  token!: string;

  newUtente(x: FormGroup) {
    let ut = utente.factory();
    ut = Object.assign(ut, x.value);

    this.bs.next(ut);

    this.httpReq.onAddUser(ut);
  }

 
}
