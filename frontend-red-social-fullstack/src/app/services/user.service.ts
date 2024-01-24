import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

const API_URL = AppSettings.API_ENDPOINT;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-user'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUser(userId: string): Observable<User> {
    return this.http.get(
      `${API_URL}/users?id=${userId}`,
      httpOptions
    ) as Observable<User>;
  }

  editUser(userid: string, fullName: string, email: string, age: number) {
    return this.http.put(
      API_URL + '/users?userId=' + userid,
      { fullName, email, age },
      httpOptions
    ) as Observable<User>;
  }
}
