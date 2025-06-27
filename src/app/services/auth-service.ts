import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'users';

  constructor() {}

  // Save user credentials to localStorage
  signup(email: string, password: string): boolean {
    try {
      const users = this.getUsers();
      if (users.some(user => user.email === email)) {
        return false; // User already exists
      }
      users.push({ email, password });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
      return false;
    }
  }

  // Validate login credentials
  login(email: string, password: string): boolean {
    try {
      const users = this.getUsers();
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error validating user from localStorage:', error);
      return false;
    }
  }

  // Retrieve users from localStorage
  private getUsers(): { email: string; password: string }[] {
    const storedUsers = localStorage.getItem(this.STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}