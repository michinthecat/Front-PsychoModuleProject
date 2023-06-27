import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient/patient.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class PatientService {
  private apiUrl: String = environment.AwsUrl + '/patients';

  constructor(private http: HttpClient) {}

  getPatient(patientId: string): Observable<Patient> {
    const url = `${this.apiUrl}/${patientId}`;
    return this.http.get<Patient>(url);
  }

  updatePatientNotes(patientId: string, notes: string): Observable<Patient> {
    const url = `${this.apiUrl}/${patientId}/notes`;
    return this.http.patch<Patient>(url, notes);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    const url = `${this.apiUrl}`;
    return this.http.put<Patient>(url, patient);
  }
}
