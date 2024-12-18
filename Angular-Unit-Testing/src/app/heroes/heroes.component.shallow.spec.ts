import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Component, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { Hero } from '../hero';

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
});
