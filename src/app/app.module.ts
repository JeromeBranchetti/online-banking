import { AuthGuard } from './guard/auth-guard.service';
import { HttpRequestService } from './service/httpRequest.service';
import { RouterModule } from '@angular/router';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { LOCALE_ID, NgModule } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestComponent } from './admin-dash-board/request/request.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphicComponent } from './graphic/graphic.component';
import { NgChartsModule } from 'ng2-charts';
import { ErrorComponent } from './error/error.component';
import { ChangeEmailPassComponent } from './change-email-pass/change-email-pass.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AssicurazioniComponent } from './assicurazioni/assicurazioni.component';

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
    ChangeEmailPassComponent,
    PrivacyComponent,
    AssicurazioniComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule,
    FormsModule,
  ],
  providers: [HttpRequestService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
