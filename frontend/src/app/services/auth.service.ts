import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Globals} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private typeKey = 'token_type';
  public loggedIN = false;
  public loginError = false;
  public loading = false;

  constructor(private client: HttpClient, private router: Router, private globals: Globals) {
  }

  auth(username: string, password: string) {
    const newHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.loading = true;
    this.client.post<any>(`${this.globals.baseAddress}/api-token-auth`, {username, password}, {
      headers: newHeaders
    }).subscribe(
      data => {
        console.log(data);
        localStorage.setItem(this.tokenKey, data.token);
        localStorage.setItem(this.typeKey, data.token_type);
        this.loading = false;
        this.loggedIN = true;
        this.loginError = false;
        this.router.navigate(['']).catch();
      }, error => {
        console.log(error);
        this.loading = false;
        this.loggedIN = false;
        this.loginError = true;
      }
    );
  }

  getToken() {
    const tokenType = localStorage.getItem(this.typeKey);
    const tokenVal = localStorage.getItem(this.tokenKey);
    return `${tokenType} ${tokenVal}`;
  }

  updateToken() {
    const oldToken = localStorage.getItem(this.tokenKey);
    const newHeaders = this.authHeaders();
    newHeaders.append('Content-Type', 'application/json');
    this.loading = true;
    this.client.post<any>(`${this.globals.baseAddress}/api-token-update`, {token: oldToken}, {
      headers: newHeaders
    }).subscribe(
      data => {
        console.log('Token successfully updated');
        localStorage.setItem(this.tokenKey, data.token);
        localStorage.setItem(this.typeKey, data.token_type);
        this.loading = false;
        this.loggedIN = true;
        this.loginError = false;
      }, error => {
        console.log('Token cannot be updated');
        console.log(error);
        this.loading = false;
        this.loggedIN = false;
        this.router.navigate(['login']);
      }
    );
  }

  isLoggedIn(): Observable<any> {
    if (null != localStorage.getItem(this.tokenKey)) {
      this.loggedIN = true;
      this.updateToken();
      return this.verifyToken();
    } else {
      return of(false);
    }
  }

  logOut() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.typeKey);
    this.loggedIN = false;
    this.router.navigate(['login']);
  }

  authHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem(this.typeKey)} ${localStorage.getItem(this.tokenKey)}`
    });
  }

  verifyToken(): Observable<any> {
    const authHeaders = this.authHeaders();
    return this.client.get(`${this.globals.baseAddress}/api-token-test`, {headers: authHeaders});
  }
}
