import { utente } from './../class/utente';
import { SignUpService } from './../service/signUp.service';
import { HttpRequestService } from './../service/httpRequest.service';
import { RequestModel } from './../admin-dash-board/request.model';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { conto } from '../class/conto';

@Component({
  selector: 'app-home-page-guest',
  templateUrl: './home-page-guest.component.html',
  styleUrls: ['./home-page-guest.component.css'],
})
export class HomePageGuestComponent implements OnInit {
  conti: conto[] = [];
  idUt: string = 'null';
  request: RequestModel;
  utente: utente;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private httpReq: HttpRequestService,
    private sign: SignUpService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.idUt = params.get('idUt');
      this.http
        .get<conto[]>('http://localhost:3000/conti', {
          params: {
            idUt: params.get('idUt'),
          },
        })
        .subscribe((res) => {
          this.conti = res;
        });
    });
    this.sign.bs.subscribe((res) => {
      console.log(res);
      this.utente = res;
      console.log(this.utente);
    });
  }
  toPayment() {
    this.router.navigate(['/payment']);
  }

  toConto(id: number) {
    this.router.navigate(['/userDashboard'], {
      queryParams: { idUt: this.idUt, idCont: id },
    });
  }

  newConto() {
    let cont = new conto(0);
    cont.idUt = Number(this.idUt);

    this.request = {
      type: 'account opening',
      firstName: this.utente.firstName,
      lastName: this.utente.lastName,
      dateOfBirth: this.utente.birthDate,
      email: this.utente.email,
      idCont: cont.id,
    };
    console.log(this.request);
    this.httpReq.onAddRequest(this.request);
  }
}
