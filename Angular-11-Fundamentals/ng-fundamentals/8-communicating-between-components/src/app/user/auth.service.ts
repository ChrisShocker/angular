import { Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  currentUser!: IUser;

  loginUser(userName: string, password: string) {
    //hard code a user for now
    this.currentUser = {
      id: 1,
      userName: 'userName',
      firstName: 'John',
      lastName: 'Papa'
    };
  }

  //fake an isAuthenticated call
  isAuthenticated(){
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string){
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
}
