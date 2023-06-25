import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/models/gender.model';

@Injectable()
export class GenderService {
  private apiUrl: string = 'http://apirest-aws-psyco-env.eba-bpusjxfs.us-east-1.elasticbeanstalk.com/genders';


  constructor(private http: HttpClient) {}

  getGenders(): Observable<Gender[]> {
    return this.http.get<Gender[]>(this.apiUrl);
  }

}
