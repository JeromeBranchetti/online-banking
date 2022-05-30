import { HttpRequestService } from './service/httpRequest.service';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ReactiveFormsModule } from '@angular/forms';
import { RequestComponent } from './admin-dash-board/request/request.component';
import { HttpClientModule } from '@angular/common/http';

import { GraphicComponent } from './graphic/graphic.component';
import { NgChartsModule } from 'ng2-charts';
import { ErrorComponent } from './error/error.component';

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
    PaymentComponent,
    RequestComponent,
    GraphicComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule,
  ],
  providers: [HttpRequestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
