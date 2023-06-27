import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialty } from 'src/app/models/specialty/specialty.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  private apiUrl: string = environment.AwsUrl + '/specialties';

  constructor(private http: HttpClient) {}

  getAllSpecialties(): Observable<Specialty[]> {
    const url = `${this.apiUrl}/all`;
    return this.http.get<Specialty[]>(url);
  }

  createSpecialty(specialty: Specialty): Observable<Specialty> {
    const url = `${this.apiUrl}`;
    return this.http.post<Specialty>(url, specialty);
  }

  updateSpecialty(id: number, specialty: Specialty): Observable<Specialty> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Specialty>(url, specialty);
  }

  deleteSpecialty(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
