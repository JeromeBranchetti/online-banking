import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  errorMessage = this.auth.error.message;
  seconds: number = 6;
  private countDownSubscription: Subscription;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const customInterval = new Observable((observer) => {
      let count = 6;
      setInterval(() => {
        observer.next(count);
        if (count === 1) {
          observer.complete();
        }
        count--;
        this.seconds = count;
      }, 1000);
    });

    this.countDownSubscription = customInterval.subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {},
      () => {
        this.router.navigate(['']);
      }
    );
  }

  ngOnDestroy(): void {
    this.countDownSubscription.unsubscribe();
  }

  navigateToHomePage() {
    this.router.navigate(['']);
  }
}
