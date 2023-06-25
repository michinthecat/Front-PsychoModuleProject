import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor(private router: Router){}

  attributes: CognitoUserAttribute[];
  poolData = {
    UserPoolId: environment.UserPoolId,
    ClientId: environment.ClientId,
  };

  onLogout(): void {
    var userPool = new CognitoUserPool(this.poolData);
    var currentUser = userPool.getCurrentUser();
    currentUser.signOut();
    this.router.navigate(['']);
  }

  getAttributes(): Observable<CognitoUserAttribute[]> {
    return new Observable<CognitoUserAttribute[]>(observer => {
      var userPool = new CognitoUserPool(this.poolData);
      var currentUser = userPool.getCurrentUser();
      currentUser.getSession((err: any, session: any) => {
        if (err) {
          observer.error(err.message || JSON.stringify(err));
          return;
        }
        currentUser.getUserAttributes((err, result) => {
          if (err) {
            observer.error(err.message || JSON.stringify(err));
            return;
          }
          this.attributes = result;
          observer.next(this.attributes);
          observer.complete();
        });
      });
    });
  }






}
