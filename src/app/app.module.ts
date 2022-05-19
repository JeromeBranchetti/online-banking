import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppBarComponent } from './app-bar/app-bar.component';
import { FootBarComponent } from './foot-bar/foot-bar.component';
import { HomePageGuestComponent } from './home-page-guest/home-page-guest.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    AppBarComponent,
    FootBarComponent,
    HomePageGuestComponent,
    UserDashBoardComponent,
    AccountDetailComponent,
    AdminDashBoardComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
