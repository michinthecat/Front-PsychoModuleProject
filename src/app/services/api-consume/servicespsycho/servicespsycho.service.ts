import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesPsycho } from 'src/app/models/servicespsycho/servicespsycho.model';

@Injectable({
  providedIn: 'root'
})
export class ServicespsychoService {
  private apiUrl: string = 'http://apirest-aws-psyco-env.eba-bpusjxfs.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) {}

  getAllServicesPsycho(): Observable<ServicesPsycho[]> {
    const url = `${this.apiUrl}/services/all`;
    return this.http.get<ServicesPsycho[]>(url);
  }

  createServicesPsycho(servicesPsycho: ServicesPsycho): Observable<ServicesPsycho> {
    const url = `${this.apiUrl}/services`;
    return this.http.post<ServicesPsycho>(url, servicesPsycho);
  }

  updateServicesPsycho(id: number, servicesPsycho: ServicesPsycho): Observable<ServicesPsycho> {
    const url = `${this.apiUrl}/services/${id}`;
    return this.http.put<ServicesPsycho>(url, servicesPsycho);
  }

  deleteServicesPsycho(id: number): Observable<any> {
    const url = `${this.apiUrl}/services/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
