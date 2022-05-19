import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';

const routes: Routes = [
{
  path:'',component:HomeComponent
},
   {
     path:'login', component:LoginComponent
     
   },
  {  
    path:'userDashBoard',component:UserDashBoardComponent
   },
 {
  path:'signUp',component:SignUpComponent
   }
 ]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
