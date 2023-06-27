import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment/appointment.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppointmentService {
  private apiUrl = environment.AwsUrl + '/appointment';

  constructor(private http: HttpClient) {}

  searchAppointment(appointmentId: string): Observable<Appointment> {
    const url = `${this.apiUrl}/${appointmentId}`;
    return this.http.get<Appointment>(url);
  }

  rescheduleAppointment(
    appointmentId: string,
    newDate: string
  ): Observable<void> {
    const url = `${this.apiUrl}/${appointmentId}/reschedule?newDate=${newDate}`;
    return this.http.put<void>(url, {});
  }

  cancelAppointment(appointmentId: string): Observable<any> {
    const url = `${this.apiUrl}/${appointmentId}/cancel`;
    return this.http.put(url, {}, { responseType: 'text' });
  }

  getAllAppointmentsByDateAndPsychologistId(
    date: string,
    psychologistId: string
  ): Observable<Appointment[]> {
    const url = `${this.apiUrl}/date/${date}/psychologist/${psychologistId}`;
    return this.http.get<Appointment[]>(url);
  }
}
