import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(accessToken: string, user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem('userId');
    window.sessionStorage.setItem(USER_KEY, accessToken);
    window.sessionStorage.setItem('userId', user._id);
    window.sessionStorage.setItem('user', JSON.stringify(user));
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
