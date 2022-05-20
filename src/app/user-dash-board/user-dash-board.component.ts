import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css']
})
export class UserDashBoardComponent implements OnInit {
cliente:string="******** "
n_conto:string="*****************"
iban:string="it1020304050"
saldo:string="***************"
modeSpione=true;
  constructor() { }

  ngOnInit(): void {
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


