import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule/schedule.mode';


@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private apiUrl: string = 'http://apirest-aws-psyco-env.eba-bpusjxfs.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) {}

  getScheduleByPsychologistAndDate(psychologistId: string, date: string): Observable<Schedule[]> {
    const url = `${this.apiUrl}/schedule/psychologist/${psychologistId}/date/${date}`;
    return this.http.get<Schedule[]>(url);
  }

  createSchedule(schedule: Schedule): Observable<any> {
    const url = `${this.apiUrl}/schedule`;
    return this.http.post(url, schedule);
  }
}
