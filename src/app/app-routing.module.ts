import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { SingupComponent } from './views/auth/signup/singup.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';
import { HomeGuard } from './guards/home.guard';
import { RolGuard } from './guards/rol.guard';
import { AppointmentformComponent } from './appointmentform/appointmentform.component';
import { SearchappointmentComponent } from './views/appointments/searchappointment/searchappointment.component';
import { MenuComponent } from './menus/menu-user/menu.component';
import { ShowAppointmentComponent } from './views/appointments/showappointment/showappointment.component';
import { NotFoundComponent } from './views/auth/notfound/notfound.component';
import { SearchpatientComponent } from './views/patients/searchpatient/searchpatient.component';
import { UpdatepatientComponent } from './views/patients/updatepatient/updatepatient.component';
import { ShowschedulesComponent } from './views/schedules/showschedules/showschedules.component';
import { SpecialtyComponent } from './views/specialty/specialty.component';
import { ServicespsychoComponent } from './views/servicespsycho/servicespsycho/servicespsycho.component';
import { ForgotpasswordComponent } from './views/auth/forgotpassword/forgotpassword.component';
import { MenuAdminComponent } from './menus/menu-admin/menu-admin.component';
import { PsychologistComponent } from './views/psychologist/psychologist.component';
import { MainhomeComponent } from './views/mainhome/mainhome.component';


const routes: Routes = [
  {path:'', component: MainhomeComponent, canActivate: [LoginGuard]},
  {path:'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path:'signup', component: SingupComponent, canActivate: [LoginGuard]},
  {path:'appointmentform', component: AppointmentformComponent},
  {path:'mainhome', component: MainhomeComponent},
  {path:'adminhome', component: HomeComponent, canActivate: [RolGuard]},
  {path:'menu', component: MenuComponent, canActivate: [HomeGuard]},
  {path:'menu-admin', component: MenuAdminComponent, canActivate: [RolGuard]},
  {path: 'search-appointment', component: SearchappointmentComponent, canActivate: [HomeGuard]},
  {path: 'show-appointment', component: ShowAppointmentComponent, canActivate: [HomeGuard]},
  {path: 'search-patient' , component: SearchpatientComponent, canActivate: [HomeGuard]},
  {path: 'update-patient' , component: UpdatepatientComponent, canActivate: [HomeGuard]},
  {path: 'show-schedules' , component: ShowschedulesComponent, canActivate: [HomeGuard]},
  {path: 'specialty-admin' , component: SpecialtyComponent, canActivate: [RolGuard]},
  {path: 'servicespsycho-admin' , component: ServicespsychoComponent, canActivate: [RolGuard]},
  {path: 'psychologist-admin' , component: PsychologistComponent, canActivate: [RolGuard]},
  {path: 'forgot-password' , component: ForgotpasswordComponent, canActivate: [LoginGuard]},
  {path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
