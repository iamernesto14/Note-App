import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
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
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          this.uppercaseValidator(),
          this.lowercaseValidator(),
          this.numberValidator(),
          this.specialCharValidator()
        ]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  // Custom validator for uppercase letter
  private uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      return /[A-Z]/.test(control.value) ? null : { noUppercase: true };
    };
  }

  // Custom validator for lowercase letter
  private lowercaseValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      return /[a-z]/.test(control.value) ? null : { noLowercase: true };
    };
  }

  // Custom validator for number
  private numberValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      return /[0-9]/.test(control.value) ? null : { noNumber: true };
    };
  }

  // Custom validator for special character
  private specialCharValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      return /[!@#$%^&*(),.?":{}|<>]/.test(control.value) ? null : { noSpecialChar: true };
    };
  }

  // Custom validator for password matching
  private passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl) => {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true };
    };
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      const signupSuccess = this.authService.signup(email, password);
      if (signupSuccess) {
        this.signUpError = null;
        this.toasterService.showToast('Sign-up successful! Please log in.', 'success');
        this.router.navigate(['/login']);
      } else {
        this.signUpError = 'Email already exists. Please use a different email.';
      }
    } else {
      this.signUpError = 'Please fill out all fields correctly';
      this.signUpForm.markAllAsTouched();
    }
  }
}