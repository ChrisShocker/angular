//note naming testing files in this fasion is not recommended

import { DebugElement } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from '../event-details';

//integration tests allow us to also test a component's template
describe('SessionListComponent', () => {
  let mockAuthService: any,
    mockVoterService: any,
    //create pieces for component itself using fixture
    //fixture is a wrapper around the component instance
    fixture: ComponentFixture<SessionListComponent>,
    //handle to component we're testing
    component: SessionListComponent,
    //template reference to work with template
    element: HTMLElement,
    //element for working with template
    debugEl: DebugElement;

  beforeEach(() => {
    //create angular component and angular testing module
    //mini module only for this test
    TestBed.configureTestingModule({
      //takes in an object that is the same specification as the app module
      //add everything the component would require from appmodule to function
      declarations: [SessionListComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService },
      ],
    });
  });

  describe('initial display', () => {});
});
