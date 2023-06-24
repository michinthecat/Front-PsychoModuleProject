import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { SingupComponent } from './views/singup/singup.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';
import { HomeGuard } from './guards/home.guard';
import { AppointmentformComponent } from './appointmentform/appointmentform.component';
import { CancelappointmentComponent } from './views/appointments/cancelappointment/cancelappointment.component';
import { SearchappointmentComponent } from './views/appointments/searchappointment/searchappointment.component';
import { MenuComponent } from './menu/menu.component';
import { ShowAppointmentComponent } from './views/appointments/showappointment/showappointment.component';
import { NotFoundComponent } from './views/notfound/notfound.component';
import { SearchpatientComponent } from './views/patients/searchpatient/searchpatient.component';
import { UpdatepatientComponent } from './views/patients/updatepatient/updatepatient.component';


const routes: Routes = [
  {path:'', component: LoginComponent, canActivate: [LoginGuard]},
  {path:'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path:'signup', component: SingupComponent, canActivate: [LoginGuard]},
  {path:'appointmentform', component: AppointmentformComponent},
  {path:'adminhome', component: HomeComponent, canActivate: [HomeGuard]},
  {path:'menu', component: MenuComponent, canActivate: [HomeGuard]},
  {path: 'cancel-appointment', component: CancelappointmentComponent, canActivate: [HomeGuard]},
  {path: 'search-appointment', component: SearchappointmentComponent, canActivate: [HomeGuard]},
  {path: 'show-appointment', component: ShowAppointmentComponent, canActivate: [HomeGuard]},
  {path: 'search-patient' , component: SearchpatientComponent, canActivate: [HomeGuard]},
  {path: 'update-patient' , component: UpdatepatientComponent, canActivate: [HomeGuard]},
  {path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
