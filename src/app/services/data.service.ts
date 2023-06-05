import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


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



}
