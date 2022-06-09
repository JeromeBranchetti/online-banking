import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailPassComponent } from './change-email-pass.component';

describe('ChangeEmailPassComponent', () => {
  let component: ChangeEmailPassComponent;
  let fixture: ComponentFixture<ChangeEmailPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEmailPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
