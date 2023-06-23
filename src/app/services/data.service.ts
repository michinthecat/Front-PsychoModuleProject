import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Psychologist } from '../models/psychologist.model';
import { PsycologistByService } from '../models/psycologist-by-service.model';
import { DatesByPsycologist } from '../models/dates-by-psycologist.model'
import { StudentAppointmentData } from '../models/student-appointment-data.model'
import { ExternalAppointmentData } from '../models/external-appointment-data.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'https://b8oisr2463.execute-api.us-east-2.amazonaws.com/dev';

  constructor(private http: HttpClient) { }

  getGenders(): Observable<any[]>{
    const url = this.apiUrl + '/genders'
    return this.http.get<any[]>(url);
  }

  getServices(): Observable<any[]>{
    const url = this.apiUrl + '/services'
    return this.http.get<any[]>(url);
  }

  getPrograms(): Observable<any[]>{
    const url = this.apiUrl + '/programs'
    return this.http.get<any[]>(url);
  }

  getUserType(): Observable<any[]>{
    const url = this.apiUrl + '/usertypes'
    return this.http.get<any[]>(url);
  }

  getSemesters(): Observable<any[]>{
    const url = this.apiUrl + '/semesters'
    return this.http.get<any[]>(url);
  }

  getPsychologistsByService(service: string): Observable<PsycologistByService[]> {
    const url = this.apiUrl + '/psychologists/byservice?serviceId=' + service;
    return this.http.get<PsycologistByService[]>(url);  
  }
  
  getDatesByPsycologist(idPsycologist: string, date: string): Observable<DatesByPsycologist[]>{
    const url = this.apiUrl + '/times/by-date?id= ' + idPsycologist + '&' +'date='+ date;
    return this.http.get<DatesByPsycologist[]>(url);  
  }

  createStudentAppointment(studentAppointmentData: StudentAppointmentData): Observable<any>{
    const url = this.apiUrl + '/appointments/students'
    return this.http.post(url, studentAppointmentData);
  }

  createExternalAppointment(externalAppointmentData: ExternalAppointmentData){
    const url = this.apiUrl + '/appointments/externals';
    return this.http.post(url, externalAppointmentData);
  }




}
