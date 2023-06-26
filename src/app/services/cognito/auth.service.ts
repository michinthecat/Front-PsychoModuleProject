import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environment/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { CognitoService } from './cognito.service';
import { PsychologistService } from '../api-consume/psychologist/psychologist.service';
import { Psychologist } from 'src/app/models/psychologist/psychologist.model';

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
  userRole$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);


  constructor(
    private cognitoService: CognitoService,
    private psychologistService: PsychologistService
  ) { }

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

        if (isAuth) {
          this.cognitoService.getCedula().subscribe(
            (cedula: string) => {
              this.psychologistService.getPsychologist(parseInt(cedula)).subscribe(
                (psychologist: Psychologist) => {
                  const userRole = psychologist.role.id;
                  this.userRole$.next(userRole);
                }
              );
            }
          );
        }
      });
    } else {
      this.isAuthSubject.next(false);
      this.userRole$.next(null);  // reset user role when not authenticated
    }

    return isAuth;
  }





}
