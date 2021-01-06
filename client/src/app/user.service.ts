import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  updateUser(): Observable<Location[]>{
    return this.http.get<Location[]>(this.rootURL + '/users');
  }

  getLocation(): Observable<Location>{
    return this.http.get<Location>(this.rootURL + '/user');
  }

}
