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
    },
    {
      name: 'Giovanni',
      lastName: 'Bianchi',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
    {
      name: 'Raffaele',
      lastName: 'Verdi',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
    {
      name: 'Omar',
      lastName: 'Gialli',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
    {
      name: 'Beatrice',
      lastName: 'Viola',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
    {
      name: 'Federico',
      lastName: 'Marroni',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
    {
      name: 'Luca',
      lastName: 'Luca',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
    {
      name: 'Riccardo',
      lastName: 'Riccardi',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
    {
      name: 'Cristiano',
      lastName: 'Ronaldo',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
    {
      name: 'Karim',
      lastName: 'Benzema',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
    {
      name: 'Vittorio',
      lastName: 'Sgarbi',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
    {
      name: 'Fabio',
      lastName: 'Caressa',
      dateOfBirth: '06/10/1996',
      email: 'andrea.rossi@gmail.it',
    },
  ];

  oldRequests: RequestModel[] = [
    {
      name: 'Christian Kareem',
      lastName: 'Cianci',
      dateOfBirth: '02/01/1997',
      email: 'ckcianci@gmail.com',
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
  requestIndex: number;
  selectedRequest: RequestModel;

  constructor() {}

  ngOnInit(): void {}

  onSelectRequest(index: number) {
    this.requestVisibility = true;
    this.requestIndex = index;
  }

  onAcceptRequest() {
    this.oldRequests.push(this.newRequests[this.requestIndex]);
    this.newRequests.splice(this.requestIndex, 1);
  }

  onDeclineRequest() {
    this.oldRequests.push(this.newRequests[this.requestIndex]);
    this.newRequests.splice(this.requestIndex, 1);
  }
}
