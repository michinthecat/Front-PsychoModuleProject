import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environment/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private poolData = {
    UserPoolId: environment.UserPoolId,
    ClientId: environment.ClientId,
  };

  private isAuthSubject = new Subject<boolean>();
  isAuthStateChanged = this.isAuthSubject.asObservable();

  constructor() { }

  isAuth(): boolean {
    var isAuth = false;

    var userPool = new CognitoUserPool(this.poolData);
    var currentUser = userPool.getCurrentUser();
    if (currentUser != null) {
      currentUser.getSession((err:any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        isAuth = session.isValid();
        this.isAuthSubject.next(isAuth);
      });
    } else {
      this.isAuthSubject.next(false);
    }
    return isAuth;
  }
}
