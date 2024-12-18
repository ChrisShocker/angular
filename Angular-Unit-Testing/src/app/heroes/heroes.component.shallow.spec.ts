import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService = jasmine.createSpyObj([
    'getHeroes',
    'addHero',
    'deleteHero',
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should work', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call getHeroes on ngOnInit and set the heroes properly', () => {
    mockHeroService.getHeroes.and.returnValue(
      of([{ id: 1, name: 'SuperDude', strength: 8 }])
    );
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toBe(1);
  });
});
