import { animate, state, style, transition, trigger } from '@angular/animations';
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
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(500),
      ]),
    ]),
  ]
})
export class CustomAlertComponent implements OnInit, OnDestroy {
  @ViewChild('alert') alert: ElementRef;
  @Output() closePressed = new EventEmitter<void>();

  myMessage!: string;
  successOperation!: boolean;
  firstSubscribtion = new Subscription();
  secondSubscribtion = new Subscription();
  state: string = 'void';

  constructor(private httpRequestService: HttpRequestService) {}

  ngOnInit(): void {
    this.firstSubscribtion = this.httpRequestService.errorFlag.subscribe(
      (flag: boolean) => {
        this.secondSubscribtion = this.httpRequestService.message.subscribe(
          (message: string) => {
            this.myMessage = message;
            this.successOperation = flag;
            this.state = '*';
          }
        );
      }
    );
    setTimeout(() => {
      this.closeAlert();
    }, 3000);
  }

  closeAlert() {
    this.closePressed.emit();
    this.state = 'void';
  }

  ngOnDestroy() {
    this.firstSubscribtion.unsubscribe();
    this.secondSubscribtion.unsubscribe();
    this.httpRequestService.completeOperation.next(false);
  }
}
