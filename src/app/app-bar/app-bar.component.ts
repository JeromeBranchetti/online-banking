import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  eyeOpen:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  openCloseToggle() {
    this.eyeOpen = !this.eyeOpen;
  }

  logOut() {}

}
