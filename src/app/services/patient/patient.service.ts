import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient/patient.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PatientService {
  private apiUrl = 'http://apirest-aws-psyco-env.eba-bpusjxfs.us-east-1.elasticbeanstalk.com/patients';

  constructor(private http: HttpClient) {}

  getPatient(patientId: string): Observable<Patient> {
    const url = `${this.apiUrl}/${patientId}`;
    return this.http.get<Patient>(url);
  }
}
