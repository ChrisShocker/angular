//note naming testing files in this fashion is not recommended

import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from '../event-details';
import { DurationPipe } from '../shared';
import { By } from '@angular/platform-browser';

//integration tests allow us to also test a component's template
describe('SessionListComponent', () => {
  let mockAuthService: any,
    mockVoterService: any,
    //create pieces for component itself using fixture
    //fixture is a wrapper around the component instance
    fixture: ComponentFixture<SessionListComponent>,
    //handle to component we're testing
    component: SessionListComponent,
    //template wrapper around DOM reference to work with template
    element: HTMLElement,
    //element for working with template, wrapper around the DOM API that's angular aware
    debugEl: DebugElement;

  beforeEach(() => {
    //initialize mock services
    //note the mock services need to implement all the functions required in the component they're from
    mockAuthService = {
      isAuthenticated: () => true,
      currentUser: { userName: 'Joe' },
    };
    mockVoterService = { userHasVoted: () => true };

    //create angular component and angular testing module
    //mini module only for this test
    TestBed.configureTestingModule({
      //takes in an object that is the same specification as the app module
      //add everything the component would require from appmodule to function
      declarations: [
        SessionListComponent,
        DurationPipe,

        // A deep integration test would inlcude a component and all of it's children
        // A shallow integration test only tests the parent component
        // The NO_ERRORS_SCHEMA can be used to ignore errors related to components not imported
        // CollapsibleWellComponent,
        // UpvoteComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService },
      ],
      schemas: [
        // The NO_ERRORS_SCHEMA can be used to ignore errors related to components not imported
        NO_ERRORS_SCHEMA,
      ],
    });

    //have angular create the component for us
    fixture = TestBed.createComponent(SessionListComponent);
    //get handle to sessionComponent component created
    component = fixture.componentInstance;
    //handle to debugger
    debugEl = fixture.debugElement;
    //handle to html DOM
    element = fixture.nativeElement;
  });

  describe('initial display', () => {
    it('should display the correct name', () => {
      //note the componenent will need all the require inputs, outputs, variables, models, ngChanges, etc to work
      component.sessions = [
        {
          id: 1,
          name: 'Session 1',
          presenter: 'Joe',
          duration: 1,
          level: 'beginner',
          abstract: 'some abstract',
          voters: ['john', 'bob'],
        },
      ];

      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      //call lifecyle method manually
      component.ngOnChanges();

      //change detection must be ran manully to kick off ngOnChanges
      fixture.detectChanges();

      //need to grap the specifc dev to get the {{session.name}}
      //use textContent.toContain since it will only look for the text
      expect(element.querySelector('[well-title]')?.textContent).toContain(
        'Session 1'
      );
      //example for using the debug element to do the same above
      expect(
        debugEl.query(By.css('[well-title]')).nativeElement.textContent
      ).toContain('Session 1');
    });
  });
});
