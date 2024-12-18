import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Component, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService = jasmine.createSpyObj([
    'getHeroes',
    'addHero',
    'deleteHero',
  ]);

  // mock child component hero class
  @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
  class MockHeroComponent {
    @Input() hero: Hero;
    //@Output() delete = new EventEmitter();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent, MockHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
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

  it('should create one li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(
      of([
        { id: 1, name: 'SuperDude', strength: 8 },
        { id: 2, name: 'WonderfulWoman', strength: 24 },
      ])
    );

    fixture.detectChanges();

    // use the queryAll selector to get all the li elements
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(2);
    // or use the debugElement queryAll selector to get all the li elements
    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(2);
  });
});
