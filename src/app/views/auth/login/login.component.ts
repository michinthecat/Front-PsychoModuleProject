import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('900ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private router: Router, private cognitoService: CognitoService) {}

  onLogin(): void {
    this.cognitoService.authenticateUser(this.email, this.password).subscribe(
      (result: any) => {
        this.router.navigate(['/show-appointment']);
      },
      (err: any) => {
        alert(err.message || JSON.stringify(err));
      }
    );
  }
}
