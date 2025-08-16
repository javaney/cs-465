import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Travlr Admin');

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    // Check authentication status on app initialization
    this.authenticationService.checkAuthenticationStatus();
  }
}
