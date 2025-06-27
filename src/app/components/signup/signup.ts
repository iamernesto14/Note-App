import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToasterService } from '../../services/toaster';
import { AuthService } from '../../services/auth-service'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class SignUp {
  signUpForm: FormGroup;
  signUpError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toasterService: ToasterService,
    private authService: AuthService
  ) {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator for password matching
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      const signupSuccess = this.authService.signup(email, password);
      if (signupSuccess) {
        this.signUpError = null;
        this.toasterService.showToast('Sign-up successful!', 'success');
        this.router.navigate(['/notes']);
      } else {
        this.signUpError = 'Email already exists. Please use a different email.';
      }
    } else {
      this.signUpError = 'Please fill out all fields correctly';
    }
  }
}