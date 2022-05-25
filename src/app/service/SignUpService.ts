import { EventEmitter, Injectable, Output } from "@angular/core";
import {  FormGroup } from "@angular/forms";
import { utente } from "../class/utente";

@Injectable({
    providedIn: 'root'
  })
  export class SignUpService {
    @Output() newUt:EventEmitter<utente> = new EventEmitter<utente>(); 
    newGuest!:utente; 
  
 newUtente(x: FormGroup){
   
    let ut=utente.factory();
    ut=Object.assign( ut,x.value)
    console.log(ut)  //cancel
    this.newGuest=ut;
    this.newUt.emit(ut);

    // this.sendServer();

    
    
    
    
 }
 sendServer(){
   console.log("/todo")
 }
  }