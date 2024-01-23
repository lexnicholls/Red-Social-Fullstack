import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(accessToken: string, userId: string, fullName: string, email: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem('userId');
    window.sessionStorage.removeItem('fullName');
    window.sessionStorage.removeItem('email');
    window.sessionStorage.setItem(USER_KEY, accessToken);
    window.sessionStorage.setItem('userId', userId);
    window.sessionStorage.setItem('fullName', fullName);
    window.sessionStorage.setItem('email', email);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}