import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToasterService } from '../../services/toaster';
import { AuthService } from '../../services/auth-service';

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
    private toasterService: ToasterService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const loginSuccess = this.authService.login(email, password);
      if (loginSuccess) {
        this.loginError = null;
        this.toasterService.showToast('Successfully logged in!', 'success');
        this.router.navigate(['/notes']);
      } else {
        this.loginError = 'Invalid email or password';
      }
    } else {
      this.loginError = 'Please fill out all fields correctly';
    }
  }

  onGoogleLogin(): void {
    console.log('Logging in with Google...');
    this.toasterService.showToast('Google login not yet implemented.', 'info');
  }
}