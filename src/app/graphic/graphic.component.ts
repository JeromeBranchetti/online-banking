import { HttpRequestService } from './../service/httpRequest.service';
import { AuthService } from './../service/auth.service';
import { TransactionService } from './../service/transaction.service';
import { UtenteService } from './../service/utente.service';

import { BankTransaction } from './../class/bankTransaction.model';

import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
})
export class GraphicComponent implements OnInit {
  Graphic!: Chart;

  constructor(
    private http: HttpClient,
    private US: UtenteService,
    private transactionService: TransactionService,
    private auth: AuthService,
    private httpReq: HttpRequestService
  ) {}

  ngOnInit(): void {
    this.transactionService.bankTransactionFlag.subscribe((res)=>this.Init(res))
    
  }

  Init(res:BankTransaction[]): void {
   

        let x = [];
        let y = [];
        for (let v of res) {
          y.push(v.amount);
          x.push(v.data);
        }

        this.Graphic = new Chart('myChart', this.myChartInit(x, y));

        this.Graphic.update();
      ;
  }

  myChartInit(x: any[], y: any[]): ChartConfiguration {
    const data = {
      labels: x,
      datasets: [
        {
          label: 'Andamento conto',
          data: y,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',

          tension: 0.1,
        },
      ],
    };
    const config: ChartConfiguration = {
      type: 'line',
      data: data,
    };

    return config;
  }
}
