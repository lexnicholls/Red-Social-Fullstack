import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  onSignInUser() {
    const { email, password } = this.userForm.value;
    if (this.userForm.status === 'VALID') {
      this.authService
        .login(email, password)
        .subscribe(({ accessToken, user }) => {
          this.storageService.saveUser(accessToken, user);
          this.reloadPage();
        });
    }
  }

  reloadPage(): void {
    window.location.replace('/landingpage');
  }
}
