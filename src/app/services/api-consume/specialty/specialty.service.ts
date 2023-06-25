import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialty } from 'src/app/models/specialty/speciality.model';


@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private apiUrl: string = 'http://apirest-aws-psyco-env.eba-bpusjxfs.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) {}

  getAllSpecialties(): Observable<Specialty[]> {
    const url = `${this.apiUrl}/specialties/all`;
    return this.http.get<Specialty[]>(url);
  }

  createSpecialty(specialty: Specialty): Observable<Specialty> {
    const url = `${this.apiUrl}/specialties`;
    return this.http.post<Specialty>(url, specialty);
  }

  updateSpecialty(id: number, specialty: Specialty): Observable<Specialty> {
    const url = `${this.apiUrl}/specialties/${id}`;
    return this.http.put<Specialty>(url, specialty);
  }

  deleteSpecialty(id: number): Observable<any> {
    const url = `${this.apiUrl}/specialties/${id}`;
    return this.http.delete(url);
  }
}
