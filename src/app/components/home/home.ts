import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  constructor(private router: Router) {
    // Initialization logic can go here
  }

  // Additional methods and properties can be added as needed
  navigateToSignup() {
    // Logic to navigate to the sign-up page
    this.router.navigate(['/signup']);
    console.log('Navigating to sign-up page...');
  }
}
