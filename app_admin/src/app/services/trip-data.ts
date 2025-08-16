import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: string;
  start: string;
  resort: string;
  perPerson: string;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3002/api/';
  private imageBaseUrl = 'http://localhost:3002/images/';

  constructor(private http: HttpClient) {}

  getImageUrl(imageName: string): string {
    return `${this.imageBaseUrl}${imageName}`;
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}trips`);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}trips`, formData);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}trips/code/${tripCode}`);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}trips/${formData.code}`, formData);
  }

  deleteTrip(tripCode: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}trips/${tripCode}`);
  }
}
