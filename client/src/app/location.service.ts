import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './location';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.rootURL + '/locations');
  }

  getLocation(): Observable<Location>{
    return this.http.get<Location>(this.rootURL + '/location');
  }

}
