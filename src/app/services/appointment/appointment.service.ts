import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment/appointment.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AppointmentService {
  private apiUrl = 'http://apirest-aws-psyco-env.eba-bpusjxfs.us-east-1.elasticbeanstalk.com/appointment';

  constructor(private http: HttpClient) {}

  searchAppointment(appointmentId: string): Observable<Appointment> {
    const url = `${this.apiUrl}/${appointmentId}`;
    return this.http.get<Appointment>(url);
  }

  rescheduleAppointment(appointmentId: string, newDate: string): Observable<void> {
    const url = `${this.apiUrl}/${appointmentId}/reschedule?newDate=${newDate}`;
    return this.http.put<void>(url, {});
  }

  cancelAppointment(appointmentId: string): Observable<any> {
    const url = `${this.apiUrl}/${appointmentId}/cancel`;
    return this.http.put(url, {}, { responseType: 'text' });
  }



}
