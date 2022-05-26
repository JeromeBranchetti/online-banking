import { Router } from '@angular/router';
import { SignUpService } from './../service/SignUpService';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( public SUService:SignUpService,private router:Router) { }
  regex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^W]).{8,32}$')
  ngOnInit(): void {
  }
  signUp_form=new FormGroup(
    {
      name: new FormControl(null,Validators.required,),
      date:new FormControl(null,[Validators.required]),
      last_name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(this.regex)])
       


    }
  );
  dataValidator(c: AbstractControl): { [key: string]: boolean } | null {
    console.log("test")
   
    
    let birth=new Date(c.value)
    let today=new Date()
    
    if((today.getFullYear()-birth.getFullYear())>18){
     
       return {maggiorenne:true};
    }
    else if((today.getFullYear()-birth.getFullYear())<18){
      return {'maggiorenne':false};
    }
     else if((today.getFullYear()-birth.getFullYear())===18){
         if((today.getMonth()-birth.getMonth())>0){
         
           return {'maggiorenne':true};
         }
         else if((today.getMonth()-birth.getMonth())<0){
           return {'maggiorenne':false};
         }
         else if((today.getMonth()-birth.getMonth())===0){
        if(today.getDay()-birth.getDay()>0){
             return {'maggiorenne':false};
           }
           else if((today.getDay()-birth.getDay())<0){
            return {'maggiorenne':false};
           }
            else if(today.getDay()===birth.getDay()){
            
        return {'maggiorenne':true};
            }
         }
     }
    
     return null;
}
  

    delete(){
      
      this.signUp_form.reset()
      
    }
    signUp(){
     this.SUService.newUtente(this.signUp_form);
     this.router.navigate(['userDashboard']);



    }
    
}
