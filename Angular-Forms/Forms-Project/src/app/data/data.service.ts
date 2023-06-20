import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //url from the putsReq website that allows us to fake http responses 
  private putsReq: string = 'https://putsreq.com/H1az6Z0D7SnODXVzZGBW';

  constructor(private http: HttpClient) { }

  //handle user object sent from form 
  //change Observable type to any, to handle whatever is posted from form
  postUserSettingsForm(UserSettings: UserSettings): Observable<any>{
    //http returns an observable, no type casting needed
    return this.http.post(this.putsReq, UserSettings);
    // return of(UserSettings);
  }
}
