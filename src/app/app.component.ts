import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/cognito/auth.service';
import { CognitoService } from './services/cognito/cognito.service';
import { Psychologist } from './models/psychologist/psychologist.model';
import { PsychologistService } from './services/api-consume/psychologist/psychologist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cognito-front';
  isLoggedIn: boolean;
  isLoggedWithAdmin: boolean;

  constructor(
    private authService: AuthService,
    private cognitoService: CognitoService,
    private psychologistService: PsychologistService
  ) {}

  ngOnInit() {
    // Verificar el estado de autenticación al cargar el componente
    this.isLoggedIn = this.authService.isAuth();

    // Obtener el rol al cargar el componente
    this.cognitoService.getCedula().subscribe(
      (cedula: string) => {
        this.psychologistService.getPsychologist(parseInt(cedula)).subscribe(
          (psychologist: Psychologist) => {
            this.isLoggedWithAdmin = psychologist.role.id === 2;
          },
          (error: any) => {
            console.error('Error al obtener el psicólogo:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error al obtener la cédula:', error);
      }
    );

    // Verificar el estado de autenticación después de la inicialización del componente
    this.authService.isAuthStateChanged.subscribe((isAuth: boolean) => {
      this.isLoggedIn = isAuth;
    });
  }
}
