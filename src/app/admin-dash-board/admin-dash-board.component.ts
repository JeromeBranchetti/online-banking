import { conto } from './../class/conto';
import { utente } from './../class/utente';
import { HttpRequestService } from './../service/httpRequest.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

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
})
export class AdminDashBoardComponent implements OnInit {
  newRequests: RequestModel[] = [];
  oldRequests: RequestModel[] = [];
  requestsLight: string[] = [];
  userList: utente[] = [];
  oldUserList: utente[] = [];

  requestVisibility: boolean = false;
  buttonVisibility: boolean = false;
  requestIndex: number;
  selectedUser: utente;
  selectedRequest: RequestModel;
  selectedLight: string;

  constructor(private httpReq: HttpRequestService) {}

  ngOnInit(): void {
    this.onFetchRequest();
    this.httpReq.userList.subscribe((res) => {
      this.userList = res.filter();
    });
  }

  // Metodo per il colore

  onColorRequestList() {
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
        console.log(res);
        this.newRequests = res;
        this.onColorRequestList();
      },
      error: (errorRes) => {
        console.log(errorRes);
      },
    });
  }

  onSelectNewRequest(index: number) {
    this.requestVisibility = true;
    this.requestIndex = index;
    this.buttonVisibility = true;
    this.selectedRequest = this.newRequests[index];
    this.selectedLight = this.requestsLight[index];
    console.log(this.userList);
    this.selectedUser = this.userList.find(
      (user) => user.id === this.selectedRequest.userId
    );
    console.log(this.selectedUser);
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
    this.httpReq.onDeleteRequest(this.newRequests[this.requestIndex].id);
    this.oldRequests.push(this.newRequests[this.requestIndex]);
    this.oldUserList.push(this.selectedUser);
    this.newRequests.splice(this.requestIndex, 1);
    this.selectedRequest.result = 'Accettato';
    if (this.selectedRequest.state === 'CLOSURE_REQUEST') {
      this.httpReq.onDisactivateAccount(this.selectedRequest.id);
    } else {
      this.httpReq.onActivateAccount(this.selectedRequest.id);
    }
  }

  onDeclineRequest() {
    this.requestVisibility = false;
    this.selectedRequest.header = 'red';
    this.httpReq.onDeleteRequest(this.newRequests[this.requestIndex].id);
    this.oldRequests.push(this.newRequests[this.requestIndex]);
    this.oldUserList.push(this.selectedUser);
    this.newRequests.splice(this.requestIndex, 1);
    this.selectedRequest.result = 'Declinato';
    if (this.selectedRequest.state !== 'CLOSURE_REQUEST') {
      this.httpReq.onDisactivateAccount(this.selectedRequest.id);
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
    // this.httpReq.onGetUser().subscribe((res) => {
    //   this.userList = JSON.parse(JSON.stringify(res));
    //   this.userList;
    //   this.exportAsExcelFile(this.userList, 'UserList.xlsx');
    // });
  }
}
