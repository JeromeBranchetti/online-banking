import { SpioneService } from './../service/SpioneService';
import { SignUpService } from './../service/SignUpService';
import { Component, OnInit } from '@angular/core';
import { utente } from '../class/utente';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';


@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css']
})
export class UserDashBoardComponent implements OnInit {
cliente:string="******** "
n_conto:string="*****************"
iban:string="it***************************"
saldo:string="***************"
guest!:utente;
modeSpione!:boolean;
  constructor(public SUService:SignUpService,public SpioneService:SpioneService ) { }

  ngOnInit(): void {
    this.SUService.bs.subscribe(ut=> {this.guest=ut;})
    this.SpioneService.bs.subscribe(bool =>{this.modeSpione=bool})
    
  }

   copia() {
    var input = document.createElement('input');
    var area = this.iban;
    input.setAttribute('value', area);
    document.body.appendChild(input);
    input.select();
    var risultato = document.execCommand('copy');
    document.body.removeChild(input);
    return risultato;
 }
    
  };


