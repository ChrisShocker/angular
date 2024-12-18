import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { provideRouter, RouterLink } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

// Deep test will check the child components
describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService = jasmine.createSpyObj([
    'getHeroes',
    'addHero',
    'deleteHero',
  ]);
  let heroes: Hero[] = [
    { id: 1, name: 'SuperDude', strength: 8 },
    { id: 2, name: 'WonderfulWoman', strength: 24 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        provideRouter([]),
        provideHttpClient(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
  });

  it('should work', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should each hero as a HeroComponent', () => {
    // query all child Hero component elements rendered by the HeroesComponent
    expect(fixture.nativeElement.querySelectorAll('app-hero').length).toBe(2);

    // can also be done using the debugElement
    expect(
      fixture.debugElement.queryAll(By.directive(HeroComponent)).length
    ).toBe(2);

    // can breakout the dbugElement to get all the nodes/child elements rendered
    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    // Then we can reference the node/component instance and check the properties
    expect(heroComponentDEs[0].componentInstance.hero.name).toBe('SuperDude');
    expect(heroComponentDEs[1].componentInstance.hero.name).toBe(
      'WonderfulWoman'
    );
    // We can also loop through the array of nodes and check the properties
    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(heroes[i]);
    }
  });
});
