import { HttpRequestService } from './../service/httpRequest.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SpioneService } from '../service/spione.service';
import { SignUpService } from '../service/signUp.service';
import { Component, OnInit } from '@angular/core';
import { utente } from '../class/utente';
import { conto } from '../class/conto';
import { Location } from '@angular/common';
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
  guest = utente.factory();

  modeSpione!: boolean;
  conto = new conto(0);
  constructor(
    public SUService: SignUpService,
    public spioneService: SpioneService,
    private location: Location,
    private route: ActivatedRoute,
    private httpReq: HttpRequestService,
    private sign: SignUpService
  ) {}

  ngOnInit(): void {
    this.spioneService.bs.subscribe((bool) => {
      this.modeSpione = bool;
    });

    this.route.queryParamMap.subscribe((params) => {
      this.httpReq.GetUserid(params.get('idUt'));
      this.sign.bs.subscribe((res) => {
        console.log(res[0]); //chiedere perchè c è bisogno di [0]
        this.guest = res[0];
      });
    });
    this.route.queryParamMap.subscribe((params) => {
      this.httpReq.GetConto(params.get('idCont'));
      this.sign.bsconto.subscribe((res) => {
        this.conto = res;
      });
    });
  }

  copyMode() {
    const copiedIban = this.conto.iban;
    navigator.clipboard.writeText(copiedIban);
  }

  backButton() {
    this.location.back();
  }

  closeContoButton() {
    // chiudere il conto
  }
}
