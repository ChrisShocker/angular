import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //prevent external components from manipulating our private data 
  private _users: BehaviorSubject<User[]>;

  //build data store
  private dataStore: {
    users: User[];
  }

  constructor(private http: HttpClient) {
    //initialize dataStore, will hold objects retirieved from API
    this.dataStore = { users: [] }
    //initialize behaviorSubject
    this._users = new BehaviorSubject<User[]>([]);
  }

  loadUsersFromAPI() {
    const userAPIURL = 'https://angular-material-api.azurewebsites.net/users';

    //call API to fill dataStore user Object Array
    return this.http.get<User[]>(userAPIURL)
      .subscribe(data => {
        this.dataStore.users = data;
        // provide alert when new data is available to listeining components
        // use Object.assign to create a copy of the data so the original data location
        // isn't sent to external components. Note: only send users back to callers
        this._users.next(Object.assign({}, this.dataStore).users);
      }, error => {
        console.log(`error: ${error}`);
      });
  }

  //allow components to get user object
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  getUserById(id: number) {
    //search dataStore for passed in ID and return it
    return this.dataStore.users.find(user => user.id == id);
  }

  //return a Promise of type User
  addUser(user: User): Promise<User> {
    return new Promise((resolver, reject) => {

      //assign user an id that's greater then largest id by 1
      user.id = this.dataStore.users.length + 1;

      //add user to the dataStore
      this.dataStore.users.push(user);

      //notify subscribed components a change has occured to user object
      this._users.next(Object.assign({}, this.dataStore).users);

      //always resolve whatever was passed in
      resolver(user);
    })
  }

}
