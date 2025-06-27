import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../services/toaster';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './forget-password.html',
  styleUrls: ['./forget-password.scss']
})
export class ForgetPassword {
  resetForm: FormGroup;
  resetError: string | null = null;
  resetSuccess: boolean = false;
  emailSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toasterService: ToasterService,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', []], // No validators initially
      confirmPassword: ['', []] // No validators initially
    }, { validators: [] });

    // Add validators for password fields only when email is submitted
    this.resetForm.get('email')?.valueChanges.subscribe(() => {
      if (this.emailSubmitted) {
        this.resetForm.get('newPassword')?.setValidators([Validators.required, Validators.minLength(6)]);
        this.resetForm.get('confirmPassword')?.setValidators([Validators.required]);
        this.resetForm.setValidators(this.passwordMatchValidator.bind(this));
        this.resetForm.get('newPassword')?.updateValueAndValidity({ emitEvent: false });
        this.resetForm.get('confirmPassword')?.updateValueAndValidity({ emitEvent: false });
      } else {
        this.resetForm.get('newPassword')?.clearValidators();
        this.resetForm.get('confirmPassword')?.clearValidators();
        this.resetForm.clearValidators();
        this.resetForm.get('newPassword')?.updateValueAndValidity({ emitEvent: false });
        this.resetForm.get('confirmPassword')?.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  // Custom validator for password matching
  private passwordMatchValidator(control: import('@angular/forms').AbstractControl) {
    const form = control as FormGroup;
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (!this.emailSubmitted) {
      // Step 1: Validate email
      const emailControl = this.resetForm.get('email');
      if (emailControl?.valid) {
        const email = emailControl.value;
        if (this.authService.emailExists(email)) {
          this.emailSubmitted = true;
          this.resetError = null;
          // Apply password validators now
          this.resetForm.get('newPassword')?.setValidators([Validators.required, Validators.minLength(6)]);
          this.resetForm.get('confirmPassword')?.setValidators([Validators.required]);
          this.resetForm.setValidators(this.passwordMatchValidator.bind(this));
          this.resetForm.get('newPassword')?.updateValueAndValidity();
          this.resetForm.get('confirmPassword')?.updateValueAndValidity();
        } else {
          this.resetError = 'No account found with this email';
        }
      } else {
        this.resetError = 'Please enter a valid email';
        emailControl?.markAsTouched();
      }
    } else {
      // Step 2: Validate and save new password
      if (this.resetForm.valid) {
        const { email, newPassword } = this.resetForm.value;
        const success = this.authService.resetPassword(email, newPassword);
        if (success) {
          this.resetError = null;
          this.resetSuccess = true;
          this.toasterService.showToast('Password reset successfully!', 'success');
          setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
          this.resetError = 'Failed to reset password. Please try again.';
        }
      } else {
        this.resetError = 'Please fill out all fields correctly';
        this.resetForm.markAllAsTouched();
      }
    }
  }

  resetFormState(): void {
    this.emailSubmitted = false;
    this.resetError = null;
    this.resetSuccess = false;
    this.resetForm.reset();
    this.resetForm.get('newPassword')?.clearValidators();
    this.resetForm.get('confirmPassword')?.clearValidators();
    this.resetForm.clearValidators();
    this.resetForm.get('newPassword')?.updateValueAndValidity({ emitEvent: false });
    this.resetForm.get('confirmPassword')?.updateValueAndValidity({ emitEvent: false });
  }
}