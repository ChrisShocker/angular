import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISession } from '../shared';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from '../event-details/voter.service';

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

  //parameter passed from event details to get the event id
  @Input() eventId!: number;

  //parameter passed from event details html to sort session lists
  @Input() sortBy!: string;

  //array of sessions that can be filtered and sorted
  visibleSessions: ISession[] = [];


  constructor(protected authService: AuthService, private voterService: VoterService){

  }

  //called everytime an input variable in component changes
  ngOnChanges(): void {
    //sessions must be loaded to filter them
    if (this.sessions) {
      //call function to sort the sessions by the filterBy value
      this.filterSessions(this.filterBy);

      //sort the sessions array
      //note the array sort function is a mutation method,
      //it sorts the original array in place and returns it
      //sort takes in a comparison function
      this.sortBy === 'name'
        ? this.visibleSessions.sort(sortByNameAscending)
        : this.visibleSessions.sort(sortByVotesDescending);
    }
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      //call a service to remove a voter
      //note the sessions have a list of voters by userName
      //call the authservice to get the current user
      this.voterService.deleteVoter(
        session,
        this.authService.currentUser.userName
      );
    } else {
      this.voterService.addVoter(this.eventId, session, this.authService.currentUser.userName);
    }
    //update the list of sessions by voters 
    if(this.sortBy === 'votes'){
      this.visibleSessions.sort(sortByVotesDescending);
    }
  }

  userHasVoted(session: ISession){
    return this.voterService.userHasVoted(session, this.authService.currentUser.userName);
  }

  filterSessions(filter: string) {
    if (filter === 'all') {
      //this is wrong since both varibales now point to the same memory
      //return this.visibleSessions = this.sessions;

      //we can use the slice method to return a completely new dataset in new memory
      return (this.visibleSessions = this.sessions.slice(0));
    } else {
      // return a new visible sessions array with new memory and filter the orginal sessions list by the filter
      return (this.visibleSessions = this.sessions.filter((session) => {
        return session.level.toLocaleLowerCase() === filter;
      }));
    }
  }
}
//define functions in comp since they don't have funcionality anywhere else

//note logic is based on what's needed to the array.sort function
function sortByNameAscending(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return -1;
}

//note logic is based on what's needed to the array.sort function
function sortByVotesDescending(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
