import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToasterService } from '../../services/toaster';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toasterService: ToasterService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (email === 'test@example.com' && password === 'password') {
        this.loginError = null;
        this.router.navigate(['/notes']);
        this.toasterService.showToast('Successfully logged in!', 'success');
      } else {
        this.loginError = 'Invalid email or password';
      }
    } else {
      this.loginError = 'Please fill out all fields correctly';
    }
  }

  onGoogleLogin(): void {
    // Simulate Google login logic (you can later replace with Firebase or OAuth logic)
    console.log('Logging in with Google...');
    this.toasterService.showToast('Google login not yet implemented.', 'info');
  }
}
