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
  isLoggedWithAdmin: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthStateChanged.subscribe((isAuth: boolean) => {
      this.isLoggedIn = isAuth;
    });

    this.authService.userRole$.subscribe((userRole: number | null) => {
      this.isLoggedWithAdmin = userRole === 2;
    });
  }
}
