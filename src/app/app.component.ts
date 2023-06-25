import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/cognito/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cognito-front';
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuth();

    // Verificar el estado de autenticación después de la inicialización del componente
    this.authService.isAuthStateChanged.subscribe((isAuth: boolean) => {
      this.isLoggedIn = isAuth;
    });
  }
}
