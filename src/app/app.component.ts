import { SpioneService } from './service/spione.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'online-banking';
  isDarkTriggered: boolean = true;

  constructor(private spioneService: SpioneService) {}

  ngOnInit() {
    this.spioneService.activatedEmitter.subscribe((value) => {
      this.isDarkTriggered = value;
    });
  }
}
