//note naming testing files in this fasion is not recommended 
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

    it('should sort the sessions correctly', () => {
      //build a sessions list to filter
      component.sessions = <ISession[]>[
        { name: 'session 3', level: 'beginner' },
        { name: 'session 1', level: 'intermediate' },
        { name: 'session 2', level: 'advanced' },
      ];

      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 1;

      //component calls automatically, but we have to manually call for testing
      component.ngOnChanges();

      expect(component.visibleSessions[0].name).toBe('session 1');
      expect(component.visibleSessions[1].name).toBe('session 2');
      expect(component.visibleSessions[2].name).toBe('session 3');
    });
  });
});
