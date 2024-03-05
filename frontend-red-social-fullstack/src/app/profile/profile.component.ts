import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SidebarComponent],
})
export class ProfileComponent {
  userId: string = window.sessionStorage.getItem('userId') as string;
  user: User = JSON.parse(window.sessionStorage.getItem('user') as string);
  successMessage = false;

  profileForm = new FormGroup({
    userId: new FormControl(this.user._id),
    fullName: new FormControl(this.user.fullName, [Validators.required]),
    email: new FormControl(this.user.email, [
      Validators.required,
      Validators.email,
    ]),
    age: new FormControl(this.user.age, [Validators.required]),
  });

  constructor(private readonly userService: UserService) {}

  signOut() {
    const USER_KEY = 'auth-user';
    window.sessionStorage.removeItem(USER_KEY);
    window.location.replace('/signin');
  }

  toggleDark() {
    const html = document.querySelector('html');
    if (html) {
      html.classList.toggle('dark');
    }
  }

  onUpdateUserData() {
    const { userId, fullName, email, age } = this.profileForm.value;
    this.userService
      .editUser(String(userId), String(fullName), String(email), Number(age))
      .subscribe((user) => {
        this.successMessage = true;
        sessionStorage.setItem('user', JSON.stringify(user));
      });
  }
}
