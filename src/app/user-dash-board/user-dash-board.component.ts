import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../service/auth.service';
import { HttpRequestService } from './../service/httpRequest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpioneService } from '../service/spione.service';
import { SignUpService } from '../service/signUp.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { utente } from '../class/utente';
import { conto } from '../class/conto';
import { Location } from '@angular/common';
import { UtenteService } from '../service/utente.service';
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
  themeDark: boolean = true;
  public innerWidth: any;
  isModalVisible: boolean = false;
  form: FormGroup;
  completeOperation: boolean = false;
  idUtente!: number;
  // Roba immagine
  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;
  // Roba immagine fine

  @ViewChild('fotoProfilo') fotoProfilo: ElementRef;

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
    public US: UtenteService,
    formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.form = formBuilder.group({
      amount: ['1', Validators.required],
    });
  }

  ngOnInit(): void {
    this.httpReq.completeOperation.subscribe((res) => {
      if (res !== null) {
        this.completeOperation = res;
      }
    });
    this.Init();
    this.innerWidth = window.innerWidth;
    this.whatScreenSize();
    this.spioneService.activatedEmitter.subscribe((res) => {
      this.themeDark = res;
    });
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

  newConto(amount: string) {
    let i = Number(amount);
    this.isModalVisible = false;
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

  themeDarkToggle() {
    this.themeDark = !this.themeDark;
    this.spioneService.activatedEmitter.next(this.themeDark);
  }

  onIsModalVisible() {
    this.isModalVisible = true;
  }

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }


  imageUploadAction() {
    // const imageFormData = new FormData();
    const myPic = this.guest.image.append('image', this.uploadedImage, this.uploadedImage.name);


    this.httpClient.post('http://localhost:8080/api/auth/upload/image/', myPic , { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      }
      );
    }

  viewImage() {
    this.httpClient.get('http://localhost:8080/get/image/info/' + this.guest.id)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }
  
}
