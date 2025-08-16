import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { TripDataService, Trip } from '../services/trip-data';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(private tripDataService: TripDataService) {}

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
}
