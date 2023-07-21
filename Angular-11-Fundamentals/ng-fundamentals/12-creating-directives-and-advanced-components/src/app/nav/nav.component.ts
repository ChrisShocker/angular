import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { EventService, ISession } from '../events';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  //search string from search box
  searchTerm: string = '';

  //list found sessions matching searchTerm
  foundSessions: ISession[] = [];

  //inject authService to access user object
  constructor(
    public authService: AuthService,
    private eventService: EventService
  ) {}

  searchSessions(searchTerm: string) {
    //subscrive to an observable returned from the eventService
    return this.eventService
      .searchSessions(searchTerm)
      .subscribe((sessions: ISession[]) => {
        this.foundSessions = sessions;
      });
  }
}
