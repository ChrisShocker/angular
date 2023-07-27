import { VoterService } from './voter.service';
import { ISession } from '../shared';
import { Observable, of } from 'rxjs';

describe('VoterService', () => {
  let voterService: VoterService, mockHttp: any;

  //use before each to initialize fresh variables for tests
  beforeEach(() => {
    // create a mock object that simulates the delete and post call from the voter.service
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should remove the voter from the list of voters', () => {
      const session = { id: 6, voters: ['joe', 'john'] };
      //note deleteVoter returns as observable, so mockHttp must be converted to return an observable
      mockHttp.delete.and.returnValue(of(false));
      voterService.deleteVoter(3, <ISession>session, 'joe');

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('john');
    });

    it('should call the correct http.delete endpoint', () => {
      const session = { id: 6, voters: ['joe', 'john'] };
      //note deleteVoter returns as observable, so mockHttp must be converted to return an observable
      mockHttp.delete.and.returnValue(of(false));
      voterService.deleteVoter(3, <ISession>session, 'joe');

      const url: string = `/api/events/3/sessions/6/voters/joe`;

      expect(mockHttp.delete).toHaveBeenCalledWith(url);
    });
  });

  describe('addVoter', () => {
    it('should call the correct http.post endpoint', () => {
      const session = { id: 6, voters: ['joe', 'john'] };
      //note deleteVoter returns as observable, so mockHttp must be converted to return an observable
      mockHttp.post.and.returnValue(of(false));
      voterService.addVoter(3, <ISession>session, 'joe');

      //note the post method takes in 3 options url, body{}, options{}
      const url: string = `/api/events/3/sessions/6/voters/joe`;

      //the body object can be empty, but the options can't, we can simulate an object by using jasmine.any(object),
      //this tells jasmine to expect some kind of object
      expect(mockHttp.post).toHaveBeenCalledWith(url, {}, jasmine.any(Object));
    });
  });
});
