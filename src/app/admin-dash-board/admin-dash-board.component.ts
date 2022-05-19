import { RequestModel } from './request.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
})
export class AdminDashBoardComponent implements OnInit {
  requests: RequestModel[] = [
    {
      name: 'Andrea',
      lastName: 'Rossi',
      iban: '1234',
      dateOfBirth: '111',
      email: 'andrea@rossi.it',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
