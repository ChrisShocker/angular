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
        console.log(`error:  ${error}`);
      });
  }

  //allow components to get user object
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

}