import { Component } from '@angular/core';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { CognitoService } from '../services/cognito.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  attributes: CognitoUserAttribute[];

  constructor(private cognitoService: CognitoService) {}

  onLogout(): void {
    this.cognitoService.onLogout();
  }

}
