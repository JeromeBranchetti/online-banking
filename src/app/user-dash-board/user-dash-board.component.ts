import { SpioneService } from '../service/spione.service';
import { SignUpService } from '../service/signUp.service';
import { Component, OnInit } from '@angular/core';
import { utente } from '../class/utente';
import { conto } from '../class/conto';
@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css'],
})
export class UserDashBoardComponent implements OnInit {
  cliente: string = '******** ';
  n_conto: string = '*****************';
  iban: string = 'IT***************************';
  trueIban: string;
  saldo: string = '***************';
   guest!:utente;
   

  modeSpione!: boolean;
  conto!: conto;
  constructor(
    public SUService: SignUpService,
    public SpioneService: SpioneService
  ) {}

  ngOnInit(): void {

    this.conto = new conto(0);
    this.SUService.bs.subscribe((ut) => {
       this.guest = ut;
    });
    
    this.SpioneService.bs.subscribe((bool) => {
      this.modeSpione = bool;
    });
  }



  copyMode() {
    const copiedIban = this.conto.iban;
    navigator.clipboard.writeText(copiedIban);
  }
}
