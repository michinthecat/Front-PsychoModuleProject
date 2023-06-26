import { Component } from '@angular/core';
import { CognitoService } from '../services/cognito/cognito.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private cognitoService: CognitoService) {}

  onLogout(): void {
    this.cognitoService.onLogout();
  }

}
