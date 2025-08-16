import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { TripDataService, Trip } from '../services/trip-data';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  tripCode!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Check authentication before allowing access
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.tripCode = this.route.snapshot.params['id'];

    this.editForm = this.formBuilder.group({
      _id: [''],
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required]],
      length: ['', [Validators.required]],
      start: ['', [Validators.required]],
      resort: ['', [Validators.required]],
      perPerson: ['', [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.getTrip();
  }

  get f() { return this.editForm.controls; }

  getTrip(): void {
    this.tripDataService.getTrip(this.tripCode)
      .subscribe({
        next: (trip: Trip) => {
          this.editForm.patchValue(trip);
        },
        error: (error: any) => {
          console.error('Error loading trip:', error);
        }
      });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    const trip: Trip = this.editForm.value;

    this.tripDataService.updateTrip(trip)
      .subscribe({
        next: (data: Trip) => {
          console.log('Trip updated successfully:', data);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Error updating trip:', error);
        }
      });
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripDataService.deleteTrip(this.tripCode)
        .subscribe({
          next: () => {
            console.log('Trip deleted successfully');
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            console.error('Error deleting trip:', error);
          }
        });
    }
  }
}
