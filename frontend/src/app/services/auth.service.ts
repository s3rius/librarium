import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'http://localhost:8000';
  private tokenKey = 'token';
  private typeKey = 'token_type';
  public loggedIN = false;
  public loginError = false;

  constructor(private client: HttpClient, private router: Router) {
  }

  auth(username: string, password: string) {
    const newHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.client.post<any>(`${this.baseURL}/api-token-auth`, {username: username, password: password}, {
      headers: newHeaders
    }).subscribe(
      data => {
        console.log(data);
        localStorage.setItem(this.tokenKey, data.token);
        localStorage.setItem(this.typeKey, data.token_type);
        this.loggedIN = true;
        this.loginError = false;
        this.router.navigate(['']).catch();
      }, error => {
        console.log(error);
        this.loggedIN = false;
        this.loginError = true;
      }
    );
  }

  updateToken() {
    const old_token = localStorage.getItem(this.tokenKey);
    const newHeaders = this.authHeaders();
    newHeaders.append('Content-Type','application/json');
    this.client.post<any>(`${this.baseURL}/api-token-update`, {token: old_token}, {
      headers: newHeaders
    }).subscribe(
      data => {
        console.log('Token successfully updated');
        localStorage.setItem(this.tokenKey, data.token);
        localStorage.setItem(this.typeKey, data.token_type);
        this.loggedIN = true;
        this.loginError = false;
      }, error => {
        console.log('Token cannot be updated');
        console.log(error);
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
    return this.client.get(`${this.baseURL}/api-token-test`, {headers: authHeaders});
  }
}
