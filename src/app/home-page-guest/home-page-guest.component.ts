import { TransactionService } from './../service/transaction.service';
import { BankTransaction } from './../class/bankTransaction.model';
import { utente } from './../class/utente';
import { SignUpService } from './../service/signUp.service';
import { HttpRequestService } from './../service/httpRequest.service';
import { RequestModel } from './../admin-dash-board/request.model';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { conto } from '../class/conto';

@Component({
  selector: 'app-home-page-guest',
  templateUrl: './home-page-guest.component.html',
  styleUrls: ['./home-page-guest.component.css'],
})
export class HomePageGuestComponent implements OnInit {
  conti: conto[] ;
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
    private transactionService: TransactionService
  ) {}
ngOnInit(): void {
     this.Init();
}
Init(): void {
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
      this.utente = res;
    });
    this.httpReq.onGetTransactionFiltered(3);
    this.transactionService.bankTransactionFlag.subscribe((res) => {
      this.transactions = res;
    });
    console.log(this.transactions);
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
  
  


  }
}
