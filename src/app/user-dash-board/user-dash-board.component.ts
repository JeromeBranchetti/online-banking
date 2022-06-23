import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  currentSaldo!: number;
  guest = utente.factory();
  modeSpione!: boolean;
  conto = new conto(0);
  menuClicked!: boolean;
  public innerWidth: any;
  form: FormGroup;

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
    public US: UtenteService,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      amount: ['1', Validators.required],
    });
  }

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
        this.httpReq.temporanyBalanceFlag.next(this.conto.balance);
        this.httpReq.temporanyBalance = this.conto.balance;
        this.currentSaldo = res.balance;
      });
    });
  }

  newConto(amount: string) {
    let i = Number(amount);

    this.httpReq.richiestaAttivazioneConto(i);
  }

  checkAmountValue() {
    let amountToCheck = this.form.controls['amount'].value;
    if (
      Number(amountToCheck) < 0 ||
      isNaN(amountToCheck) ||
      Number(amountToCheck) >= this.currentSaldo
    ) {
      this.form.controls['amount'].setErrors(null);
    } else {
      this.form.controls['amount'].setErrors({ incorect: true });
    }
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
