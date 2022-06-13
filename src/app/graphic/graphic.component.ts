import { UtenteService } from './../service/utente.service';
import { TransactionService } from './../service/transaction.service';
import { BankTransaction } from './../class/bankTransaction.model';
import { HttpRequestService } from './../service/httpRequest.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
})
export class GraphicComponent implements OnInit {
  amount: number[] =[];
  date:string[]=[];

  Graphic!:Chart;
  

  constructor(

    private http:HttpClient,
    private US:UtenteService,
  ) {}

  ngOnInit(): void {
   
    // let idConto=this.US.idCont;
    let idConto=2;
   this.http.get<BankTransaction[]>(
      'http://localhost:3000/transazioni/?idConto=' + idConto
    ).subscribe((res)=> {
      console.log(res);
      this.amount=[];
      this.date=[];
      for(let v of res){
        this.amount.push(v.amount);
        this.date.push(v.date);
        
      }
      this.Graphic=new Chart("myChart",this.myChartInit());
      this.Graphic.update();

     });

    
    }
myChartInit():ChartConfiguration{
  

const data = {
  labels: this.date,
  datasets: [{
    label: 'My First Dataset',
    data: this.amount,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
const config:ChartConfiguration = {
  type: 'line',
  data: data,
};

return config;

}

}