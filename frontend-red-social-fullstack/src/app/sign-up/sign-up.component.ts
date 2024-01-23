import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  userForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const { fullName, age, email, password } = this.userForm.value;
    if (this.userForm.status === 'VALID') {
      this.authService
        .register(fullName, age, email, password)
        .subscribe(() => {
          this.reloadPage();
        });
    }
  }

  reloadPage(): void {
    window.location.replace('/signin');
  }
}
