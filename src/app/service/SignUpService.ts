import {  Injectable, } from "@angular/core";
import {  FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { utente } from "../class/utente";

@Injectable({
    providedIn: 'root'
  })
  export class SignUpService {
    
    bs:BehaviorSubject<utente>=new BehaviorSubject<utente>(null);
  
 newUtente(x: FormGroup){
   
    let ut=utente.factory();
    ut=Object.assign( ut,x.value)
    //cancel
    
    
    this.bs.next(ut)

    // this.sendServer();

    
    
    
    
 }
 sendServer(){
   console.log("/todo")
 }
  }