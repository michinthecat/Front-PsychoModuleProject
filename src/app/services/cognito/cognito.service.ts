import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUserAttribute, CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor(private router: Router) {}

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
    this.attributes = null;
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

  getCedula(): Observable<string> {
    return new Observable<string>(observer => {
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

          let nicknameAttribute = result.find(attribute => attribute.getName() === 'nickname');
          if (nicknameAttribute) {
            observer.next(nicknameAttribute.getValue());
            observer.complete();
          } else {
            observer.error("Cedula attribute not found");
          }
        });
      });
    });
  }

  recoverPassword(username: string): Observable<any> {
    return new Observable<any>(observer => {
      var userPool = new CognitoUserPool(this.poolData);
      var userData = {
        Username: username,
        Pool: userPool
      };
      var cognitoUser = new CognitoUser(userData);

      cognitoUser.forgotPassword({
        onSuccess: () => {
          observer.next();
          observer.complete();
        },
        onFailure: (err: any) => {
          observer.error(err.message || JSON.stringify(err));
        }
      });
    });
  }

  confirmNewPassword(username: string, verificationCode: string, newPassword: string): Observable<any> {
    return new Observable<any>(observer => {
      var userPool = new CognitoUserPool(this.poolData);
      var userData = {
        Username: username,
        Pool: userPool
      };
      var cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          observer.next();
          observer.complete();
        },
        onFailure: (err: any) => {
          observer.error(err.message || JSON.stringify(err));
        }
      });
    });
  }

  authenticateUser(username: string, password: string): Observable<any> {
    return new Observable<any>(observer => {
      var userPool = new CognitoUserPool(this.poolData);
      var authenticationData = {
        Username: username,
        Password: password
      };
      var authenticationDetails = new AuthenticationDetails(authenticationData);
      var userData = {
        Username: username,
        Pool: userPool
      };
      var cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result: any) => {
          observer.next(result);
          observer.complete();
        },
        onFailure: (err: any) => {
          observer.error(err.message || JSON.stringify(err));
        }
      });
    });
  }
}
