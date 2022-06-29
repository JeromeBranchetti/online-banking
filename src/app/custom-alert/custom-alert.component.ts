import { Subscription } from 'rxjs';
import { HttpRequestService } from './../service/httpRequest.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css'],
})
export class CustomAlertComponent implements OnInit, OnDestroy {
  @ViewChild('alert') alert: ElementRef;
  @Output() closePressed = new EventEmitter<void>();

  myMessage!: string;
  successOperation!: boolean;
  firstSubscribtion = new Subscription();
  secondSubscribtion = new Subscription();

  constructor(private httpRequestService: HttpRequestService) {}

  ngOnInit(): void {
    this.firstSubscribtion = this.httpRequestService.errorFlag.subscribe(
      (flag: boolean) => {
        this.secondSubscribtion = this.httpRequestService.message.subscribe(
          (message: string) => {
            this.myMessage = message;
            this.successOperation = flag;
            console.log(this.successOperation);
            // this.alert.nativeElement.classList.remove('d-none');
          }
        );
      }
    );
  }

  closeAlert() {
    // this.myMessage = '';
    // this.alert.nativeElement.classList.add('d-none');
    this.closePressed.emit();
  }

  ngOnDestroy() {
    console.log('distrutto');
    this.firstSubscribtion.unsubscribe();
    this.secondSubscribtion.unsubscribe();
  }
}