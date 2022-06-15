import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
})
export class PrivacyComponent implements OnInit {
  responsabilePrivacy: string = 'Giuseppa Buriana';
  bankName: string = 'JavaIsland';

  @ViewChildren('item') inputList: QueryList<any>;

  constructor() {}

  ngOnInit(): void {}

  acceptAllCookies() {
    this.inputList.toArray().forEach((elem) => {
      elem.nativeElement.checked = true;
    });
  }
}
