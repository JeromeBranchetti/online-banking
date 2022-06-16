import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Input() type: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() email: string;
  @Input() light: string;
  @Input() result: string = '';
  @Input() header: string = '';
  @Input() idConto: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
