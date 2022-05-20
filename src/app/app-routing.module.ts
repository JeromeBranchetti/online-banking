import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';

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
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },

  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'adminDashboard',
    component: AdminDashBoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
