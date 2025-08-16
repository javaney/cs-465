import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  authResp: AuthResponse = new AuthResponse();
  private tokenCheckInterval: any;

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService,
    private router: Router
  ) {
    // Start token expiration checker
    this.startTokenExpirationChecker();
  }
  
  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }
  
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }
  
  public logout(): void {
    // Clear token from storage
    this.storage.removeItem('travlr-token');

    // Reset auth response
    this.authResp = new AuthResponse();

    // Stop token expiration checker
    this.stopTokenExpirationChecker();

    // Redirect to login page
    this.router.navigate(['/login']);

    // Optional: Show logout message
    console.log('User logged out successfully');
  }

  private startTokenExpirationChecker(): void {
    // Check token expiration every 30 seconds
    this.tokenCheckInterval = setInterval(() => {
      if (this.getToken() && !this.isLoggedIn()) {
        console.log('Token expired, logging out...');
        this.logout();
      }
    }, 30000);
  }

  private stopTokenExpirationChecker(): void {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
      this.tokenCheckInterval = null;
    }
  }
  
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      try {
        // Validate token format
        const parts = token.split('.');
        if (parts.length !== 3) {
          this.logout(); // Invalid token format
          return false;
        }

        // Parse and validate payload
        const payload = JSON.parse(atob(parts[1]));
        const isValid = payload.exp > (Date.now() / 1000);

        if (!isValid) {
          this.logout(); // Token expired
          return false;
        }

        return true;
      } catch (error) {
        console.error('Invalid token format:', error);
        this.logout(); // Corrupted token
        return false;
      }
    }
    return false;
  }
  
  public getCurrentUser(): User {
    const token: string = this.getToken();
    if (token && this.isLoggedIn()) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user = new User();
        user.email = payload.email || '';
        user.name = payload.name || '';
        return user;
      } catch (error) {
        console.error('Error parsing user from token:', error);
        this.logout();
        return new User();
      }
    }
    return new User();
  }
  
  public login(user: User, passwd: string, onSuccess?: () => void, onError?: (error: string) => void): void {
    this.tripDataService.login(user, passwd).subscribe({
      next: (value: any) => {
        if(value && value.token) {
          this.authResp = value;
          this.saveToken(this.authResp.token);
          console.log('Login successful');
          if (onSuccess) onSuccess();
        } else {
          const errorMsg = 'Invalid response from server';
          console.error(errorMsg);
          if (onError) onError(errorMsg);
        }
      },
      error: (error: any) => {
        const errorMsg = error.error?.message || 'Login failed. Please check your credentials.';
        console.error('Login error:', errorMsg);
        if (onError) onError(errorMsg);
      }
    });
  }
  
  public register(user: User, passwd: string, onSuccess?: () => void, onError?: (error: string) => void): void {
    this.tripDataService.register(user, passwd).subscribe({
      next: (value: any) => {
        if(value && value.token) {
          this.authResp = value;
          this.saveToken(this.authResp.token);
          console.log('Registration successful');
          if (onSuccess) onSuccess();
        } else {
          const errorMsg = 'Invalid response from server';
          console.error(errorMsg);
          if (onError) onError(errorMsg);
        }
      },
      error: (error: any) => {
        const errorMsg = error.error?.message || 'Registration failed. Email may already be in use.';
        console.error('Registration error:', errorMsg);
        if (onError) onError(errorMsg);
      }
    });
  }

  // Method to check authentication status on app initialization
  public checkAuthenticationStatus(): void {
    const token = this.getToken();
    if (token && !this.isLoggedIn()) {
      // Token exists but is invalid/expired
      this.logout();
    }
  }
}
