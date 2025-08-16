import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private authenticationService: AuthenticationService) {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }

  public onLogout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authenticationService.logout();
    }
  }
}
