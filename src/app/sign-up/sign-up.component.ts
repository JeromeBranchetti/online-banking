import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  signUp_form=new FormGroup(
    {
      name: new FormControl(null,Validators.required,),
      date:new FormControl(null,Validators.required),
      last_name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
       //password:new FormControl(null,[Validators.required,Validators.pattern()])
      password:new FormControl(null,[Validators.required])


    }
  );
    delete(){
      
      this.signUp_form.reset()
    }
}
