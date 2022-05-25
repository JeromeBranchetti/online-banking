import { Router } from '@angular/router';
import { SignUpService } from './../service/SignUpService';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( public SUService:SignUpService,private router:Router) { }
  regex = new RegExp('^[A-Z][a-z]{4,}[0-9]*[^W]$')
  ngOnInit(): void {
  }
  signUp_form=new FormGroup(
    {
      name: new FormControl(null,Validators.required,),
      date:new FormControl(null,Validators.required),
      last_name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(this.regex)])
       


    }
  );
    delete(){
      
      this.signUp_form.reset()
      
    }
    signUp(){
     this.SUService.newUtente(this.signUp_form);
     this.router.navigate(['userDashboard']);



    }
    
}
