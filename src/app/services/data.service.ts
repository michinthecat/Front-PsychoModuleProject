import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Psychologist } from '../models/psychologist.model';
import { PsycologistByService } from '../models/psycologist-by-service.model';
import { DatesByPsycologist } from '../models/dates-by-psycologist.model'


@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'https://21xns2keo6.execute-api.us-east-2.amazonaws.com/dev';

  constructor(private http: HttpClient) { }

  getServices(): Observable<any[]>{
    const url = this.apiUrl + '/services'
    return this.http.get<any[]>(url);
  }

  getPrograms(): Observable<any[]>{
    const url = this.apiUrl + '/programs'
    return this.http.get<any[]>(url);
  }

  getPshicologists(): Observable<any[]>{
    const url = this.apiUrl + '/psychologists'
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
    const url = this.apiUrl + '/psychologists/byservice?serviciosid=' + service;
    console.log(this.http.get<PsycologistByService[]>(url))
    return this.http.get<PsycologistByService[]>(url);  
  }
  
  getDatesByPsycologist(idPsycologist: string, date: string): Observable<DatesByPsycologist[]>{
    const url = this.apiUrl + '/times/by-date?cedula= ' + idPsycologist + '&' +'fecha='+ date;
    console.log(this.http.get<PsycologistByService[]>(url))
    return this.http.get<DatesByPsycologist[]>(url);  
  }




}
