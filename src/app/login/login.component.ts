import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  login_form=new FormGroup(
    {
      
      email:new FormControl(null,[Validators.required,Validators.email]),
       //password:new FormControl(null,[Validators.required,Validators.pattern()])
      password:new FormControl(null,[Validators.required])


    }
  )

  login(email:string,password:string){
    console.log(email,password)
  }
  delete(){
    this.login_form.reset()

    

  }
}
