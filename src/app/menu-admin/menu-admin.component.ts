import { Component } from '@angular/core';
import { CognitoService } from '../services/cognito/cognito.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {

  constructor(private cognitoService: CognitoService) {}

  onLogout(): void {
    this.cognitoService.onLogout();
  }

}
