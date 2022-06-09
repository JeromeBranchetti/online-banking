import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-email-pass',
  templateUrl: './change-email-pass.component.html',
  styleUrls: ['./change-email-pass.component.css']
})
export class ChangeEmailPassComponent implements OnInit {
  isEmail: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  switchEmailPass() {
    this.isEmail = !this.isEmail;
  }

  onChangePass() {
    //fare logica richiesta HTTP modifica password
  }

  onChangeEmail() {
    //fare logica richiesta HTTP modifica email
    
  }

}
