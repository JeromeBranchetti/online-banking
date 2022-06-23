
import { TransactionService } from './../service/transaction.service';

import { BankTransaction } from './../class/bankTransaction.model';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';



@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
})
export class GraphicComponent implements OnInit, OnDestroy {
 Graphic = new Chart('myChart', this.myChartInit([], []));

  constructor(

    private transactionService: TransactionService,

  ) {}
  ngOnDestroy(): void {
    this.Graphic.destroy();
    this.transactionService.bankTransactionFlag.next([]);
  }

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
    
      this.addData(this.Graphic,x,y);
   
      
        
      
        console.log(this.Graphic);
        console.log(this.Graphic.data.datasets[0].data);
        
      ;
  }
  addData(chart:Chart,label:any[],data:any[]){
    chart.data.labels=label;
    chart.data.datasets[0].data=data;
  

   
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
      options:{responsive:true},
    };
 
    return config;
  }
}
