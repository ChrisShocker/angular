import { Injectable } from '@angular/core';
import { ISession } from '../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class VoterService {
  constructor(private http: HttpClient) {}

  deleteVoter(session: ISession, voterName: string) {
    //filter out the userName from the voter array
    session.voters = session.voters.filter((voter) => voter !== voterName);
  }

  addVoter(eventId: number, session: ISession, voterName: string) {
    //add the current voter to the session's voter array
    session.voters.push(voterName);

    let url: string = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    let options = { headers: new HttpHeaders({'Content-Type' : 'application/json'})}
    this.http.post(url, {}, options).pipe(catchError(this.handleError('addVoter')))
    .subscribe();
  }

  userHasVoted(session: ISession, voterName: string) {
    //check if session voter array was the current voter
    return session.voters.some((voter) => voter === voterName);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
