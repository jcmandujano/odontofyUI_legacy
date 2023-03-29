import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:1337/api/auth/local';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API, {
      identifier: username,
      password: password
    }, httpOptions);
  }
  
  register(payload:any): Observable<any> {
    return this.http.post(AUTH_API + '/register',payload, httpOptions);
  }
}