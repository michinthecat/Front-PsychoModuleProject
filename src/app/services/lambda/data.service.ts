import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PsycologistByService } from '../../models/psychologist/psycologist-by-service.model';
import { DatesByPsycologist } from '../../models/schedule/dates-by-psycologist.model';
import { StudentAppointmentData } from '../../models/appointment/student-appointment-data.model';
import { ExternalAppointmentData } from '../../models/appointment/external-appointment-data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = environment.AwsLambdaUrl;

  constructor(private http: HttpClient) {}

  getGenders(): Observable<any[]> {
    const url = this.apiUrl + '/genders';
    return this.http.get<any[]>(url);
  }

  getServices(): Observable<any[]> {
    const url = this.apiUrl + '/services';
    return this.http.get<any[]>(url);
  }

  getPrograms(): Observable<any[]> {
    const url = this.apiUrl + '/programs';
    return this.http.get<any[]>(url);
  }

  getUserType(): Observable<any[]> {
    const url = this.apiUrl + '/usertypes';
    return this.http.get<any[]>(url);
  }

  getSemesters(): Observable<any[]> {
    const url = this.apiUrl + '/semesters';
    return this.http.get<any[]>(url);
  }

  getPsychologistsByService(
    service: string
  ): Observable<PsycologistByService[]> {
    const url = this.apiUrl + '/psychologists/byservice?serviceId=' + service;
    return this.http.get<PsycologistByService[]>(url);
  }

  getDatesByPsycologist(
    idPsycologist: string,
    date: string
  ): Observable<DatesByPsycologist[]> {
    const url =
      this.apiUrl +
      '/times/bydate?id= ' +
      idPsycologist +
      '&' +
      'date=' +
      date;
    return this.http.get<DatesByPsycologist[]>(url);
  }

  createStudentAppointment(
    studentAppointmentData: StudentAppointmentData
  ): Observable<any> {
    const url = this.apiUrl + '/appointments/students';
    return this.http.post(url, studentAppointmentData);
  }

  createExternalAppointment(externalAppointmentData: ExternalAppointmentData) {
    const url = this.apiUrl + '/appointments/externals';
    return this.http.post(url, externalAppointmentData);
  }
}
