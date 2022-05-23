import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Input() name: string;
  @Input() lastName: string;
  @Input() dateOfBirth: string;
  @Input() email: string;
  @Input() light: string;

  constructor() {}

  ngOnInit(): void {}
}