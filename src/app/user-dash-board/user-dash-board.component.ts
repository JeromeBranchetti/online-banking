import { SignUpService } from './../service/SignUpService';
import { Component, OnInit } from '@angular/core';
import { utente } from '../class/utente';

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
guest=new utente("a","a","a","a","a")
modeSpione=false;
  constructor(public SUService:SignUpService) { }

  ngOnInit(): void {
    
    this.SUService.newUt.subscribe((utente) =>{
      
      this.guest=this.SUService.newGuest;
      console.log(this.guest)
     
    }
    )
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


