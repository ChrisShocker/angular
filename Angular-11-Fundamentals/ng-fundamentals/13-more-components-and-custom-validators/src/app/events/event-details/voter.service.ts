import { Injectable } from "@angular/core";
import { ISession } from "../shared";

@Injectable()
export class VoterService {
  deleteVoter(session: ISession, voterName: string){
    //filter out the userName from the voter array
    session.voters = session.voters.filter(voter => voter !== voterName);
  }

  addVoter(session: ISession, voterName: string){
    //add the current voter to the session's voter array
    session.voters.push(voterName);
  }

  userHasVoted(session: ISession, voterName: string){
    //check if session voter array was the current voter
    return session.voters.some(voter => voter === voterName);
  }
}