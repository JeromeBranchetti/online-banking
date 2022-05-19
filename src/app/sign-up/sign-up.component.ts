import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
      name: new FormControl(),
      date:new FormControl(),
      last_name:new FormControl(),
      email:new FormControl(),
      password:new FormControl()


    }
  );

}
