import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Psychologist } from 'src/app/models/psychologist/psychologist.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PsychologistService {
  private apiUrl: string = environment.AwsUrl;

  constructor(private http: HttpClient) {}

  getPsychologist(id: number): Observable<Psychologist> {
    const url = `${this.apiUrl}/psychologists/${id}`;
    return this.http.get<Psychologist>(url);
  }

  getAllPsychologists(): Observable<Psychologist[]> {
    const url = `${this.apiUrl}/psychologists`;
    return this.http.get<Psychologist[]>(url);
  }

  createPsychologist(psychologist: Psychologist): Observable<Psychologist> {
    const url = `${this.apiUrl}/psychologists`;
    return this.http.post<Psychologist>(url, psychologist);
  }

  updatePsychologist(
    id: number,
    psychologist: Psychologist
  ): Observable<Psychologist> {
    const url = `${this.apiUrl}/psychologists/${id}`;
    return this.http.put<Psychologist>(url, psychologist);
  }

  deletePsychologist(id: number): Observable<any> {
    const url = `${this.apiUrl}/psychologists/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
