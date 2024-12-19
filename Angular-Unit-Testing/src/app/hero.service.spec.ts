import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let mockMessageService = jasmine.createSpyObj(['add']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
        provideHttpClient(),
        provideRouter([]),
      ],
    });
  });
});
