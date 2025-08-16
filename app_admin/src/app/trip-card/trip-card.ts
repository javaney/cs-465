import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';

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
    private tripDataService: TripDataService
  ) {}

  getImageUrl(imageName: string): string {
    return this.tripDataService.getImageUrl(imageName);
  }

  editTrip(trip: any): void {
    console.log('Edit trip:', trip);
    this.router.navigate(['/edit-trip', trip.code]);
  }
}
