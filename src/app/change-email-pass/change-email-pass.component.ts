import { HttpRequestService } from './../service/httpRequest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-email-pass',
  templateUrl: './change-email-pass.component.html',
  styleUrls: ['./change-email-pass.component.css'],
})
export class ChangeEmailPassComponent implements OnInit {
  isEmail: boolean = true;
  regex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^W]).{8,32}$');
  completeOperation: boolean = false;

  constructor(private http: HttpRequestService) {}

  ngOnInit(): void {
    this.http.completeOperation.subscribe((res) => {
      if (res !== null) {
        this.completeOperation = res;
      }
    });
  }

  switchEmailPass() {
    this.isEmail = !this.isEmail;
  }

  onChangePass(pass: string) {
    if (pass.match(this.regex) !== null) {
      this.http.changepass(pass);
    } else {
      alert('la nuova password non rispetta i criteri di sicurezza');
    }
  }

  onChangeEmail(email: string) {
    if (email.includes('@')) {
      this.http.changemail(email);
    } else {
      alert('email sbagliata');
    }
  }
}
