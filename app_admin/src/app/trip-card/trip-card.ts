import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  @Input('trip') trip: any;

  constructor(
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  getImageUrl(imageName: string): string {
    return this.tripDataService.getImageUrl(imageName);
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  editTrip(trip: any): void {
    console.log('Edit trip:', trip);
    this.router.navigate(['/edit-trip', trip.code]);
  }
}
