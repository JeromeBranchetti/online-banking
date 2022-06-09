import { utente } from './../class/utente';
import { HttpRequestService } from './../service/httpRequest.service';
import { RequestModel } from './request.model';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

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

  requestVisibility: boolean = false;
  buttonVisibility: boolean = false;
  requestIndex: number;
  selectedRequest: RequestModel;
  selectedLight: string;

  constructor(private httpReq: HttpRequestService) {}

  ngOnInit(): void {
    this.httpReq.onGetRequest().subscribe((res) => {
      this.newRequests = res;
      this.onColorRequestList();
    });
  }

  // Metodo per il colore

  onColorRequestList() {
    for (let request of this.newRequests) {
      if (request.type === 'account opening') {
        this.requestsLight.push('yellow');
      } else if (request.type === 'account registration') {
        this.requestsLight.push('green');
      } else if (request.type === 'account closure') {
        this.requestsLight.push('red');
      }
    }
  }

  // Metodi per le richieste

  onSelectNewRequest(index: number) {
    this.requestVisibility = true;
    this.requestIndex = index;
    this.buttonVisibility = true;
    this.selectedRequest = this.newRequests[index];
    this.selectedLight = this.requestsLight[index];
  }

  onSelectOldRequest(index: number) {
    this.requestVisibility = true;
    this.buttonVisibility = false;
    this.requestIndex = index;
    this.selectedRequest = this.oldRequests[index];
    this.selectedLight = 'grey';
  }

  onAcceptRequest() {
    this.oldRequests.push(this.newRequests[this.requestIndex]);
    this.newRequests.splice(this.requestIndex, 1);
    this.selectedRequest.result = 'Accepted';
    this.requestVisibility = false;
    this.selectedRequest.header = 'green';
  }

  onDeclineRequest() {
    this.oldRequests.push(this.newRequests[this.requestIndex]);
    this.newRequests.splice(this.requestIndex, 1);
    this.selectedRequest.result = 'Declined';
    this.requestVisibility = false;
    this.selectedRequest.header = 'red';
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
      this.userList = JSON.parse(JSON.stringify(res));
      this.userList;
      this.exportAsExcelFile(this.userList, 'UserList.xlsx');
    });
  }
}
