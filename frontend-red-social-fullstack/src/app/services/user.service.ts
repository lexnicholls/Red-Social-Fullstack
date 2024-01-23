import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';

const API_URL = AppSettings.API_ENDPOINT;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent() {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard() {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard() {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard() {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
