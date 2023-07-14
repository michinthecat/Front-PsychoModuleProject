import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CognitoService } from '../services/cognito/cognito.service';
import { PsychologistService } from '../services/api-consume/psychologist/psychologist.service';

@Injectable({
  providedIn: 'root'
})
export class RolAdminGuard implements CanActivate {

  constructor(private cognitoService: CognitoService, private psychologistService: PsychologistService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.cognitoService.getCedula().pipe(
      switchMap(cedula => this.psychologistService.getPsychologist(parseInt(cedula))),
      map(psychologist => psychologist.role.id === 2)
    );
  }
}
