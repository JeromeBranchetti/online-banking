import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpioneService {
  bs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  activatedEmitter = new BehaviorSubject<boolean>(true);

  SpioneMode(bool: boolean) {
    this.bs.next(bool);
  }
}
