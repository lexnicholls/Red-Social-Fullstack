import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router: any;
  constructor(private route: Router) {
    this.router = route;
  }
  loggedIn() {
    return !!localStorage.getItem('login_token');
  }
}
