import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientType } from 'src/app/models/patienttype/patienttype.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatienttypesService {
  private apiUrl: string = environment.AwsUrl + '/PatientTypes';

  constructor(private http: HttpClient) {}

  getPatientTypes(): Observable<PatientType[]> {
    return this.http.get<PatientType[]>(this.apiUrl);
  }
}
