import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentformComponent } from './appointmentform/appointmentform.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    HomeComponent,
    MenuComponent,
    AppointmentformComponent
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
