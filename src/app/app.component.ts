import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/cognito/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MAP-UNIBAGUE';
  isLoggedIn: boolean;
  isLoggedWithAdmin: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isAuth();
    this.authService.userRole$.subscribe((userRole: number | null) => {
      this.isLoggedWithAdmin = userRole === 2;
    });
  }


  //Importante: El rol de administrador es el #2
  //Guardar en Variables de entorno
  ngOnInit() {
    this.authService.isAuthStateChanged.subscribe((isAuth: boolean) => {
      this.isLoggedIn = isAuth;
    });

    this.authService.userRole$.subscribe((userRole: number | null) => {
      this.isLoggedWithAdmin = userRole === 2;
    });
  }
}
