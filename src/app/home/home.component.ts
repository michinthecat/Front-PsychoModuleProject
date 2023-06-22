import { Component } from '@angular/core';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { CognitoService } from '../services/cognito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  attributes: CognitoUserAttribute[];

  constructor(private cognitoService: CognitoService) {}

  onLogout(): void {
    this.cognitoService.onLogout();
  }

  getAttributes(): void {
    this.cognitoService.getAttributes().subscribe(
      attributes => {
        this.attributes = attributes;
        this.attributes.forEach((attr: CognitoUserAttribute) => console.log(attr.Name + ' = ' + attr.Value));
      },
      error => {
        alert(error);
      }
    );
  }
}
