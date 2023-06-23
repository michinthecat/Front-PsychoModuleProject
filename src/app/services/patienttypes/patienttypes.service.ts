import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientType } from 'src/app/models/patienttype/patienttype.model';

@Injectable({
  providedIn: 'root'
})
export class PatienttypesService{
  private apiUrl: string = 'http://apirest-aws-psyco-env.eba-bpusjxfs.us-east-1.elasticbeanstalk.com/PatientTypes';

  constructor(private http: HttpClient) {}

  getPatientTypes(): Observable<PatientType[]> {
    return this.http.get<PatientType[]>(this.apiUrl);
  }

}
