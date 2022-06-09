import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() dateOfBirth: string;
  @Input() email: string;
  @Input() light: string;
  @Input() result: string = '';
  @Input() header: string = '';

  constructor() {}

  ngOnInit(): void {}
}
