import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSettings } from '../app.settings';

const AUTH_API = AppSettings.API_ENDPOINT;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/users/auth',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(fullName: string, age: number, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/users/register',
      {
        fullName,
        age,
        email,
        password
      },
      httpOptions
    );
  }
}
