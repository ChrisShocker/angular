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

    const url: string = '/api/login';
    const options: {} = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const body: {} = { username: userName, password: password };

    //use tap pipe to see data that comes back and act on it
    return (
      this.http
        .post(url, body, options)
        .pipe(
          tap((data) => {
            const someObj: any = data;
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

  // call server to update user
  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const url = '/api/users/' + this.currentUser.id;
    const options: {} = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const body = this.currentUser;
    return this.http.put(url, body, options);
  }

  checkAuthenticationStatus() {
    const url: string = './api/currentIdentity';
    return this.http.get(url).pipe(
      // tap lets us return observables later and take actions on them
      tap((data) => {
        if (data instanceof Object) {
          this.currentUser = <IUser>data;
        }
      })
    );
  }

  logout() {
    const options: {} = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const url = '/api/logout';
    return this.http.post(url, {}, options);
  }
}
