import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripCard } from '../trip-card/trip-card';
import { TripDataService, Trip } from '../services/trip-data';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('TripListing component initialized');
    this.getTrips();
  }

  private getTrips(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (trips: Trip[]) => {
          this.trips = trips;
          console.log('Trips loaded from API:', this.trips);
        },
        error: (error: any) => {
          console.error('Error loading trips:', error);
          this.message = 'Error loading trips. Please try again later.';
        }
      });
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  addTrip(): void {
    this.router.navigate(['/add-trip']);
  }
}
