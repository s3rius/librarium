import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Resource} from '../models/resource';
import {Globals} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class LibServiceService {


  constructor(private client: HttpClient, private auth: AuthService, private globals: Globals) {
  }

  public getAllResources(offset, count): Observable<[Resource]> {
    const headers = this.auth.authHeaders();
    let params = new HttpParams().append('count', count.toString()).append('offset', offset.toString());
    console.log(params);
    return this.client.get<[any]>(`${this.globals.baseAddress}/resources`, {headers, params});
  }

}
