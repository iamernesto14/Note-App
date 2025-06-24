
   import { Component, OnInit } from '@angular/core';
   import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
   import { Router, RouterLink } from '@angular/router';

   @Component({
     selector: 'app-profile-settings',
     standalone: true,
     imports: [RouterLink, ReactiveFormsModule],
     templateUrl: './profile-settings.html',
     styleUrls: ['./profile-settings.scss']
   })
   export class ProfileSettings implements OnInit {
     settingsForm: FormGroup;
     username: string = 'User'; // Mocked from auth

     constructor(private fb: FormBuilder, private router: Router) {
       this.settingsForm = this.fb.group({
         theme: ['light', Validators.required],
         notifications: [true, Validators.required]
       });
     }

     ngOnInit() {
       const savedSettings = localStorage.getItem('userSettings');
       if (savedSettings) {
         this.settingsForm.patchValue(JSON.parse(savedSettings));
       }
     }

     saveSettings() {
       if (this.settingsForm.valid) {
         localStorage.setItem('userSettings', JSON.stringify(this.settingsForm.value));
         alert('Settings saved successfully!');
       }
     }

     onBack(): void {
       this.router.navigate(['/notes']);
     }
   }
  