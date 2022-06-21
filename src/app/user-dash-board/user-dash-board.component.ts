import { RequestModel } from './../admin-dash-board/request.model';
import { AuthService } from './../service/auth.service';
import { HttpRequestService } from './../service/httpRequest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpioneService } from '../service/spione.service';
import { SignUpService } from '../service/signUp.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { utente } from '../class/utente';
import { conto } from '../class/conto';
import { Location } from '@angular/common';
import { UtenteService } from '../service/utente.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css'],
})
export class UserDashBoardComponent implements OnInit {
  cliente: string = '******** ';
  n_conto: string = '************';
  iban: string = 'IT*********************';
  trueIban: string;
  saldo: string = '*********';
  guest = utente.factory();
  modeSpione!: boolean;
  conto = new conto(0);
  request: RequestModel;
  menuClicked!: boolean;
  public innerWidth: any;
 

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.whatScreenSize();
  
  }

  constructor(
    public SUService: SignUpService,
    public spioneService: SpioneService,
    private location: Location,
    private route: ActivatedRoute,
    private httpReq: HttpRequestService,
    private sign: SignUpService,
    private router: Router,
    private auth: AuthService,
    public US: UtenteService
  ) {}
  ngOnInit(): void {
    this.Init();
    this.innerWidth = window.innerWidth;
    this.whatScreenSize();

  }
Init(): void {
this.httpReq.bar.next(true);
    this.spioneService.bs.subscribe((bool) => {
      this.modeSpione = bool;
    });

    this.route.queryParamMap.subscribe((params) => {
      this.httpReq.GetUserid(params.get('idUt'));
      this.sign.bs.subscribe((res) => {
        
        this.guest = res;
      });
    });
    this.route.queryParamMap.subscribe((params) => {
      this.httpReq.GetConto(params.get('idCont'));
      this.sign.bsconto.subscribe((res) => {
        this.conto = res;
      });
    });
  }
  newConto() {
    this.httpReq. richiestaAttivazioneConto(1);
    alert('Apertura conto richiesta');
  }
  copyMode() {
    const copiedIban = this.conto.iban;
    navigator.clipboard.writeText(copiedIban);
  }

  backButton() {
    this.location.back();
  }

  closeContoButton() {
  this.httpReq.richiestaChiusuraConto(this.conto.id);
  }

  toChangeEmailPass() {
    this.router.navigate(['/change-email-pass']);
  }

  menuButtonToggle() {
    this.menuClicked = !this.menuClicked;
  }

  whatScreenSize() {
    if (this.innerWidth > 730) {
      this.menuClicked = true;
    } else {
      this.menuClicked = false;
    }
  }
}
