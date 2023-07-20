import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISession } from '../shared';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css'],
})
export class SessionListComponent implements OnChanges {
  //catch incoming sessions from event
  @Input() sessions!: ISession[];

  //catch incoming filter value from event and apply changes when filterBy changes
  //this can easily be done by using OnChanges
  @Input() filterBy!: string;

  visibleSessions: ISession[] = [];

  //called everytime an input variable in component changes
  ngOnChanges(): void {
    //sessions must be loaded to filter them
    if (this.sessions) {
      this.filterSessions(this.filterBy);
    }
  }

  filterSessions(filter: string) {
    if (filter === 'all') {
      //this is wrong since both varibales now point to the same memory
      //return this.visibleSessions = this.sessions; 

      //we can use the slice method to return a completely new dataset in new memory
      return this.visibleSessions = this.sessions.slice(0);
    } else {
      // return a new visible sessions array with new memory and filter the orginal sessions list by the filter
      return this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }
}
