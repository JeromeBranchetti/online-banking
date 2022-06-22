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
    this.transactionService.bankTransactionFlag.subscribe((res)=>{
      if(res.length!=0){
      console.log(res);
     
      this.Init(res)}})
    
  }

  Init(res:BankTransaction[]): void {
    console.log("Init");
   

        let x = [];
        let y = [];
        for (let v of res) {
          y.push(v.amount);
          x.push(v.data);
        }
        console.log(x);
        console.log(y);
       
        this.Graphic = new Chart('myChart', this.myChartInit(x, y));

        console.log(this.Graphic);
        
      ;
  }

  myChartInit(x: any[], y: any[]): ChartConfiguration {
    console.log("myChartInit")
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
    console.log("myChartFinish");
    return config;
  }
}
