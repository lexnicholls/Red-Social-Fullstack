import { Component } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  user: User = JSON.parse(window.sessionStorage.getItem('user') as string);

  toggleDark() {
    const html = document.querySelector('html');
    if (html) {
      html.classList.toggle('dark');
    }
  }

  signOut() {
    const USER_KEY = 'auth-user';
    window.sessionStorage.removeItem(USER_KEY);
    window.location.replace('/signin');
  }
}
