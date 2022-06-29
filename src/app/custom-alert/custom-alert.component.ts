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

  constructor(private httpRequestService: HttpRequestService) {
    this.httpRequestService.errorFlag.subscribe((flag: boolean) => {
      this.httpRequestService.message.subscribe((message: string) => {
        this.myMessage = message;
        this.successOperation = flag;
        console.log(this.successOperation);
        console.log(this.myMessage);
        this.alert.nativeElement.classList.remove('none');
      });
    });
  }

  ngOnInit(): void {}

  closeAlert() {
    this.myMessage = '';
    this.alert.nativeElement.classList.add('none');
  }
}
