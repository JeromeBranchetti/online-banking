import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class SpioneService{
    
    bs:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(null);

    SpioneMode(bool:boolean){
        this.bs.next(bool);

    }
  }