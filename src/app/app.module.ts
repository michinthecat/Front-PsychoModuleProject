import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { SingupComponent } from './views/singup/singup.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentformComponent } from './appointmentform/appointmentform.component';
import { CancelappointmentComponent } from './views/appointments/cancelappointment/cancelappointment.component';
import { ShowAppointmentComponent} from './views/appointments/showappointment/showappointment.component';
import { SearchappointmentComponent } from './views/appointments/searchappointment/searchappointment.component';
import { NotFoundComponent } from './views/notfound/notfound.component';
import { SearchpatientComponent } from './views/patients/searchpatient/searchpatient.component';
import { UpdatepatientComponent } from './views/patients/updatepatient/updatepatient.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    HomeComponent,
    MenuComponent,
    AppointmentformComponent,
    CancelappointmentComponent,
    ShowAppointmentComponent,
    SearchappointmentComponent,
    NotFoundComponent,
    SearchpatientComponent,
    UpdatepatientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
