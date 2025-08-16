import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TripDataService, Trip } from '../services/trip-data';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-add-trip',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip implements OnInit {
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Check authentication before allowing access
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.addForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required]],
      length: ['', [Validators.required]],
      start: ['', [Validators.required]],
      resort: ['', [Validators.required]],
      perPerson: ['', [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  get f() { return this.addForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    const trip: Trip = this.addForm.value;

    this.tripDataService.addTrip(trip)
      .subscribe({
        next: (data: Trip) => {
          console.log('Trip added successfully:', data);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Error adding trip:', error);
        }
      });
  }

  onReset(): void {
    this.submitted = false;
    this.addForm.reset();
  }
}
