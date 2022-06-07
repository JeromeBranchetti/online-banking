import { RequestModel } from './request.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
})
export class AdminDashBoardComponent implements OnInit {
  /* To-do: 
  - Fetch di 12 richieste e le salverò dentro l'array requests
  - Aggiungere simbolo di una V verde e di una X rossa nella lista delle richieste già verificate (in base alla decisione del dipendente)*/

  newRequests: RequestModel[] = [
    {
      name: 'Andrea',
      lastName: 'Rossi',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Giovanni',
      lastName: 'Bianchi',
      dateOfBirth: '06/10/1996',
      email: 'giovanni.bianchi@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Raffaele',
      lastName: 'Verdi',
      dateOfBirth: '06/10/1996',
      email: 'raffaele.verdi@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Omar',
      lastName: 'Gialli',
      dateOfBirth: '06/10/1996',
      email: 'omar.gialli@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Beatrice',
      lastName: 'Viola',
      dateOfBirth: '06/10/1996',
      email: 'beatrice.viola@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Federico',
      lastName: 'Marroni',
      dateOfBirth: '06/10/1996',
      email: 'federico.marroni@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Luca',
      lastName: 'Luca',
      dateOfBirth: '06/10/1996',
      email: 'luca.luca@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Riccardo',
      lastName: 'Riccardi',
      dateOfBirth: '06/10/1996',
      email: 'riccardo.riccardi@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Cristiano',
      lastName: 'Ronaldo',
      dateOfBirth: '06/10/1996',
      email: 'cristiano.ronaldo@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Karim',
      lastName: 'Benzema',
      dateOfBirth: '06/10/1996',
      email: 'karim.benzema@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Vittorio',
      lastName: 'Sgarbi',
      dateOfBirth: '06/10/1996',
      email: 'vittorio.sgarbi@gmail.it',
      result: '',
      header: '',
    },
    {
      name: 'Fabio',
      lastName: 'Caressa',
      dateOfBirth: '06/10/1996',
      email: 'fabio.caressa@gmail.it',
      result: '',
      header: '',
    },
  ];

  oldRequests: RequestModel[] = [
    {
      name: 'Christian Kareem',
      lastName: 'Cianci',
      dateOfBirth: '02/01/1997',
      email: 'ckcianci@gmail.com',
      result: 'Accepted',
      header: 'green',
    },
  ];

  requestsLight: string[] = [
    'green',
    'yellow',
    'red',
    'green',
    'yellow',
    'red',
    'green',
    'yellow',
    'red',
    'green',
    'yellow',
    'red',
  ];
  requestVisibility: boolean = false;
  buttonVisibility: boolean = false;
  requestIndex: number;
  selectedRequest: RequestModel;
  selectedLight: string;

  constructor() {}

  ngOnInit(): void {}

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

  onDownloadUserList() {}
}
