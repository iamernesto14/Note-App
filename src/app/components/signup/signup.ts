   import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
   import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
   import { Router, RouterLink } from '@angular/router';

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

     constructor(private fb: FormBuilder, private router: Router) {
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
         const { email } = this.signUpForm.value;
         this.signUpError = null;
         console.log('Sign-up successful:', { email });
         this.router.navigate(['/notes']);
       } else {
         this.signUpError = 'Please fill out all fields correctly';
       }
     }
   }
  