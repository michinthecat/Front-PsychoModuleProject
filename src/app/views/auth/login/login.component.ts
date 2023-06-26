import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito/cognito.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private router: Router, private cognitoService: CognitoService) {}



  onLogin(): void {
    this.cognitoService.authenticateUser(this.email, this.password).subscribe(
      (result: any) => {
        this.router.navigate(['/adminhome']);
      },
      (err: any) => {

        alert(err.message || JSON.stringify(err));
      }
    );
  }
}
