import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'add-trip', component: AddTrip },
  { path: 'edit-trip/:id', component: EditTrip },
  { path: '', component: TripListing, pathMatch: 'full' }
];
