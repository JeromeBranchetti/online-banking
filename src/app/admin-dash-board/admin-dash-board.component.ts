import { UtenteService } from './../service/utente.service';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { utente } from './../class/utente';
import { HttpRequestService } from './../service/httpRequest.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpErrorResponse } from '@angular/common/http';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export class RequestModel {
  id?: number;
  state?: any;
  userId?: number;
  accountNumber?: number;
  balance?: number;
  header?: string;
  result?: string;
}
@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
  animations: [
    trigger('fade-left', [
      state('void', style({ opacity: 0, transform: 'translateX(-100%)' })),
      transition(':enter, :leave', [animate(500)]),
    ]),
    trigger('fade-text', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(500)]),
    ]),
    trigger('fade-right', [
      state('void', style({ opacity: 0, transform: 'translateX(100%)' })),
      transition(':enter, :leave', [animate(500)]),
    ]),
  ],
})
export class AdminDashBoardComponent implements OnInit {
  newRequests: RequestModel[] = [];
  oldRequests: RequestModel[] = [];
  requestsLight: string[] = [];
  userList: utente[] = [];
  oldUserList: utente[] = [];

  userListDownload: utente[] = [];

  requestVisibility: boolean = false;
  buttonVisibility: boolean = false;
  requestIndex: number;
  selectedUser: utente;
  selectedRequest: RequestModel;
  selectedLight: string;

  constructor(
    private httpReq: HttpRequestService,
    private router: Router,
    private authService: AuthService,
    private US: UtenteService
  ) {}

  ngOnInit(): void {
    this.onFetchRequest();
  }

  // Metodo per il colore

  onColorRequestList() {
    this.requestsLight = [];
    for (let request of this.newRequests) {
      if (request.state === 'ACTIVATION_REQUEST') {
        this.requestsLight.push('green');
      } else if (request.state === 'CLOSURE_REQUEST') {
        this.requestsLight.push('red');
      }
    }
  }

  // Metodi per le richieste

  onFetchRequest() {
    this.httpReq.onGetRequest().subscribe({
      next: (res) => {
        this.newRequests = res;
        this.onColorRequestList();
        this.httpReq.userList.subscribe((res) => {
          this.userList = [];
          for (let request of this.newRequests) {
            this.userList.push(res.find((user) => user.id === request.userId));
          }
        });
      },
      error: (errorRes: HttpErrorResponse) => {
        alert(errorRes.error.message);
      },
    });
  }

  onSelectNewRequest(index: number) {
    this.requestVisibility = true;
    this.requestIndex = index;
    this.buttonVisibility = true;
    this.selectedRequest = this.newRequests[index];
    this.selectedLight = this.requestsLight[index];
    this.selectedUser = this.userList.find(
      (user) => user.id === this.selectedRequest.userId
    );
  }

  onSelectOldRequest(index: number) {
    this.requestVisibility = true;
    this.buttonVisibility = false;
    this.requestIndex = index;
    this.selectedRequest = this.oldRequests[index];
    this.selectedLight = 'grey';
    this.selectedUser = this.oldUserList.find(
      (user) => user.id === this.selectedRequest.userId
    );
  }

  onAcceptRequest() {
    this.requestVisibility = false;
    this.selectedRequest.header = 'green';
    this.selectedRequest.result = 'Accettato';
    this.oldRequests.push(this.newRequests[this.requestIndex]);
    this.oldUserList.push(this.selectedUser);
    this.newRequests.splice(this.requestIndex, 1);
    this.userList.splice(this.requestIndex, 1);
    if (this.selectedRequest.state === 'CLOSURE_REQUEST') {
      this.httpReq.onDisactivateAccount(this.selectedRequest.id);
    } else {
      this.httpReq.onActivateAccount(this.selectedRequest.id);
    }
  }

  onDeclineRequest() {
    this.requestVisibility = false;
    this.selectedRequest.header = 'red';
    this.selectedRequest.result = 'Rifiutato';
    this.oldRequests.push(this.newRequests[this.requestIndex]);
    this.oldUserList.push(this.selectedUser);
    this.newRequests.splice(this.requestIndex, 1);
    this.userList.splice(this.requestIndex, 1);
    if (this.selectedRequest.state !== 'CLOSURE_REQUEST') {
      this.httpReq.onDisactivateAccount(this.selectedRequest.id);
    } else {
      this.httpReq.onActivateAccount(this.selectedRequest.id);
    }
  }

  // Metodi per il download

  exportAsExcelFile(json: utente[], excelFileName: string): void {
    'Json: ' + json;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    worksheet;
    workbook;
    XLSX.utils.book_append_sheet(workbook, worksheet, excelFileName);

    XLSX.writeFile(workbook, excelFileName);
  }

  onDownloadUserList() {
    this.httpReq.onGetUser().subscribe((res) => {
      this.userListDownload = res;
      this.userListDownload = JSON.parse(JSON.stringify(res));
      this.exportAsExcelFile(this.userListDownload, 'UserList.xlsx');
    });
  }

  onLogOut() {
    this.router.navigate(['/']);
    this.authService.loggedIn.next(false);
    this.authService.authenticated = false;
    this.US.idCont = null;
    this.US.idUt = null;
  }
}
