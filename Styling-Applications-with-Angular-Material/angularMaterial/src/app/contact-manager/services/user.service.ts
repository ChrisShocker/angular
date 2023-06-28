import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataStore: {
    users: User[];
  }

  constructor(private http: HttpClient) { 
    this.dataStore = { users: []}
  }
}
