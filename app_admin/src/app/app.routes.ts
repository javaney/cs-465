import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';

export const routes: Routes = [
  { path: 'add-trip', component: AddTrip },
  { path: 'edit-trip/:id', component: EditTrip },
  { path: '', component: TripListing, pathMatch: 'full' }
];
