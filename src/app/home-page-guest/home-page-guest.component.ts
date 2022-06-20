import { AuthService } from './../service/auth.service';
import { TransactionService } from './../service/transaction.service';
import { BankTransaction } from './../class/bankTransaction.model';
import { utente } from './../class/utente';
import { SignUpService } from './../service/signUp.service';
import { HttpRequestService } from './../service/httpRequest.service';
import { RequestModel } from './../admin-dash-board/request.model';
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
  request: RequestModel;
  utente: utente;
  transactions: BankTransaction[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private httpReq: HttpRequestService,
    private sign: SignUpService,
    private transactionService: TransactionService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
      this.Init();
  }

  Init(): void {

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
          console.log('get conto:' + res);
          this.conti = res;
          console.log(this.conti);
        });
    });
    this.sign.bs.subscribe((res) => {
      this.utente = res;
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
    this.httpReq.addConto();
    alert('Apertura conto richiesta');
  }
}
