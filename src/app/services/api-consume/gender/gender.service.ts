import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/models/gender/gender.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class GenderService {
  private apiUrl: string = environment.AwsUrl + '/genders';

  constructor(private http: HttpClient) {}

  getGenders(): Observable<Gender[]> {
    return this.http.get<Gender[]>(this.apiUrl);
  }
}
