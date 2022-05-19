import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';

const routes: Routes = [
<<<<<<< HEAD
{
  path:'',component:HomeComponent
},
   {
     path:'login', component:LoginComponent
     
   },
  {  
    path:'userDashboard',component:UserDashBoardComponent
   },
 {
  path:'signUp',component:SignUpComponent
   }
 ]


=======
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userDashBoard',
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
>>>>>>> 9d26b1aae4d71f2e70ba936368decb6fe25006e0

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
