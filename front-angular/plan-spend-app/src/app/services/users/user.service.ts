import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000'; // URL base

  constructor( private http: HttpClient) { }

  userLogin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/login`);
  }
}
