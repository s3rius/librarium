import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Resource} from '../models/resource';

@Injectable({
  providedIn: 'root'
})
export class LibServiceService {

  baseUrl = 'http://localhost:8000';

  constructor(private client: HttpClient, private auth: AuthService) {
  }

  public getAllResources(): Observable<[Resource]> {
    const headers = this.auth.authHeaders();
    return this.client.get<[any]>(`${this.baseUrl}/resources`, {headers: headers});
  }

}
