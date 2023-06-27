import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule/schedule.mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private apiUrl: string = environment.AwsUrl;

  constructor(private http: HttpClient) {}

  getScheduleByPsychologistAndDate(
    psychologistId: string,
    date: string
  ): Observable<Schedule[]> {
    const url = `${this.apiUrl}/schedule/psychologist/${psychologistId}/date/${date}`;
    return this.http.get<Schedule[]>(url);
  }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    const url = `${this.apiUrl}/schedule`;
    return this.http.post<Schedule>(url, schedule);
  }

  deleteSchedule(scheduleId: number): Observable<any> {
    const url = `${this.apiUrl}/schedule/${scheduleId}`;
    return this.http.delete(url);
  }
}
