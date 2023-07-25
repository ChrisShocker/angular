import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser!: IUser;

  constructor(private http: HttpClient) {}

  //get user info from server and set current user to it
  loginUser(userName: string, password: string) {
    // //hard code a user for now
    // this.currentUser = {
    //   id: 1,
    //   userName: 'userName',
    //   firstName: 'John',
    //   lastName: 'Papa'
    // };

    let url: string = '/api/login';
    let options: {} = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let body: {} = { username: userName, password: password };

    //use tap pipe to see data that comes back and act on it
    return (
      this.http
        .post(url, body, options)
        .pipe(
          tap((data) => {
            let someObj: any = data;
            const field = 'user';
            console.log(data);
            this.currentUser = someObj[field as keyof IUser];
          })
        )
        // if an error occurs return an observable of false
        .pipe(
          catchError((err) => {
            return of(false);
          })
        )
    );
  }

  //fake an isAuthenticated call
  isAuthenticated() {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
}
