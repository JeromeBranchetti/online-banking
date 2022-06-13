import { UtenteService } from './../service/utente.service';

import { BankTransaction } from './../class/bankTransaction.model';

import { Component, OnInit, } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
})
export class GraphicComponent implements OnInit {
  

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
      
      let x=[];
      let y=[];
      for(let v of res){
        
        y.push(v.amount);
        x.push(v.date);
        
      }
      this.Graphic=new Chart("myChart",this.myChartInit(x,y));
      
      this.Graphic.update();

     });

    
    }
myChartInit(x:any[],y:any[]):ChartConfiguration{
  

const data = {
  labels: x,
  datasets: [{
    label: 'My First Dataset',
    data: y,
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