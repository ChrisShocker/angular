import { provideHttpClient } from '@angular/common/http';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    HEROES = [
      { id: 1, name: 'SpiderDog', strength: 22 },
      { id: 2, name: 'DuckScorpion', strength: 2 },
      { id: 2, name: 'PotatoRex', strength: 45 },
    ];

    // mock object with the same methods as the HeroService
    mockHeroService = jasmine.createSpyObj({
      getHeroes: of(),
      addHero: of(),
      deleteHero: of(),
    });

    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      component.heroes = HEROES;
      mockHeroService.deleteHero.and.returnValue(of(true));

      expect(component.heroes.length).toBe(3);

      component.delete(HEROES[1]);

      expect(component.heroes.length).toBe(2);
    });

    it('should call deleteHero with the correct hero', () => {
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
