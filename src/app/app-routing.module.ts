import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';
import { HomeGuard } from './guards/home.guard';
import { AppointmentformComponent } from './appointmentform/appointmentform.component';


const routes: Routes = [
  {path:'', component: LoginComponent, canActivate: [LoginGuard]},
  {path:'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path:'signup', component: SingupComponent, canActivate: [LoginGuard]},
  {path:'appointmentform', component: AppointmentformComponent},
  {path:'adminhome', component: HomeComponent, canActivate: [HomeGuard]},
  {path:'**',redirectTo:'', pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
