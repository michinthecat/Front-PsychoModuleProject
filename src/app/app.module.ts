import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './views/singup/singup.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentformComponent } from './appointmentform/appointmentform.component';
import { CancelappointmentComponent } from './views/appointments/cancelappointment/cancelappointment.component';
import { ShowappointmentComponent } from './views/appointments/showappointment/showappointment.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    HomeComponent,
    MenuComponent,
    AppointmentformComponent,
    CancelappointmentComponent,
    ShowappointmentComponent
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
