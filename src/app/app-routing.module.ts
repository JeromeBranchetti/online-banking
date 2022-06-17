import { AuthGuard } from './guard/auth-guard.service';
import { ErrorComponent } from './error/error.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';
import { HomePageGuestComponent } from './home-page-guest/home-page-guest.component';
import { ChangeEmailPassComponent } from './change-email-pass/change-email-pass.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userDashboard',
    component: UserDashBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },

  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'adminDashboard',
    component: AdminDashBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account-detail',
    component: AccountDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home-page-guest',
    component: HomePageGuestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-email-pass',
    component: ChangeEmailPassComponent,
<<<<<<< HEAD
    canActivate: [AuthGuard],
=======
     canActivate: [AuthGuard],
>>>>>>> 780a9307b648435eb53879ae5ffd2de95f71d73e
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
<<<<<<< HEAD
    canActivate: [AuthGuard],
=======
     canActivate: [AuthGuard],
>>>>>>> 780a9307b648435eb53879ae5ffd2de95f71d73e
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
