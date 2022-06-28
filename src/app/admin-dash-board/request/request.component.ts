import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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

  @Output() acceptRequest = new EventEmitter<void>();
  @Output() declineRequest = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onAcceptRequest() {
    this.acceptRequest.emit();
  }

  onDeclineRequest() {
    this.declineRequest.emit();
  }
}
