import { SessionListComponent } from './session-list.component';
import { ISession } from '../shared';

describe('SessionListComponent', () => {
  //component
  let component: SessionListComponent;

  //services
  let mockAuthService: any, mockVoterService: any;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  });

  describe('ngOnChanges', () => {
    it('should filter the sessions correctly', () => {
      //build a sessions list to filter
      component.sessions = <ISession[]>[
        { name: 'session 1', level: 'beginner' },
        { name: 'session 2', level: 'intermediate' },
        { name: 'session 3', level: 'advanced' },
      ];

      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 1;

      //component calls automatically, but we have to manually call for testing
      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(1);


    });
  });
});
