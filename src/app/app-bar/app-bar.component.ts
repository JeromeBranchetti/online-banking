
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpioneService } from '../service/SpioneService';


@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  eyeOpen:boolean = true;


  constructor(private S:SpioneService,private router: Router) { }

  ngOnInit(): void {
    this.S.SpioneMode(this.eyeOpen)
  }

  openCloseToggle() {
    this.eyeOpen = !this.eyeOpen;
    this.S.SpioneMode(this.eyeOpen)
    
  }

  logOut() {
    this.router.navigate(['/']);
  }
  
  toHome() {
    this.router.navigate(['/']);
  }

}
