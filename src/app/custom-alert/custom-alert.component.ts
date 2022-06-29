import { HttpRequestService } from './../service/httpRequest.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css'],
})
export class CustomAlertComponent implements OnInit {
  myMessage!: string;
  successOperation!: boolean;
  @ViewChild('alert') alert: ElementRef;

  constructor(private httpRequestService: HttpRequestService) {}

  ngOnInit(): void {
    this.httpRequestService.errorFlag.subscribe((flag: boolean) => {
      this.myMessage = this.httpRequestService.message;
      this.successOperation = flag;
      this.alert.nativeElement.classList.remove('none');
    });
  }

  closeAlert() {
    this.myMessage = '';
    this.alert.nativeElement.classList.add('none');
  }
}
