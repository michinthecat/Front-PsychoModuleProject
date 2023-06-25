import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void {

    var poolData = {
      UserPoolId: environment.UserPoolId,
      ClientId: environment.ClientId,
    };

    var userPool = new CognitoUserPool(poolData);

    var userData = {
      Username: this.email,
      Pool: userPool
    };

    var cognitoUser = new CognitoUser(userData);

    var authData = {
      Username: this.email,
      Password: this.password
    };

    var authDetails = new AuthenticationDetails(authData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
        this.router.navigate(['/adminhome']);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      }
    });
  }
}
