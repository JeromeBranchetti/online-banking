import { HttpRequestService } from './../service/httpRequest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-email-pass',
  templateUrl: './change-email-pass.component.html',
  styleUrls: ['./change-email-pass.component.css'],
})
export class ChangeEmailPassComponent implements OnInit {
  isEmail: boolean = true;

  constructor(
    private http:HttpRequestService
  ) {}

  ngOnInit(): void {}

  switchEmailPass() {
    this.isEmail = !this.isEmail;
  }

  onChangePass(pass:string) {
    this.http.changepass(pass);
  }

  onChangeEmail(email:string) {
    this.http.changemail(email);
  }
}
