import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  //handle user object sent from form 
  postUserSettingsForm(UserSettings: UserSettings): Observable<UserSettings>{
    return of(UserSettings);
  }
}
