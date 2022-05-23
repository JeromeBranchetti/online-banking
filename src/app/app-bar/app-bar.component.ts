import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  eyeOpen:boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openCloseToggle() {
    this.eyeOpen = !this.eyeOpen;
  }

  logOut() {
    this.router.navigate(['/']);
  }
  
  toHome() {
    this.router.navigate(['/']);
  }

}
