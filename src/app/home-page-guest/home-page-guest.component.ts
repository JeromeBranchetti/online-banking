import { AuthService } from './../service/auth.service';

import { BankTransaction } from './../class/bankTransaction.model';
import { utente } from './../class/utente';

import { HttpRequestService } from './../service/httpRequest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { conto } from '../class/conto';

@Component({
  selector: 'app-home-page-guest',
  templateUrl: './home-page-guest.component.html',
  styleUrls: ['./home-page-guest.component.css'],
})
export class HomePageGuestComponent implements OnInit {
  conti: conto[] = [];
  idUt: string = 'null';
  utente: utente;
  transactions: BankTransaction[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,

    private auth: AuthService,
    private httpreq: HttpRequestService
  ) {}

  ngOnInit(): void {
    this.Init();
  }

  Init(): void {
    this.httpreq.bar.next(false);
    this.route.queryParamMap.subscribe((params) => {
      this.idUt = params.get('idUt');

      this.http
        .get<conto[]>(
          'http://localhost:8080/api/account/users/' +
            params.get('idUt') +
            '/accounts',
          {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + this.auth.token.token,
            }),
          }
        )
        .subscribe((res) => {
          this.conti = res;
        });
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
}
