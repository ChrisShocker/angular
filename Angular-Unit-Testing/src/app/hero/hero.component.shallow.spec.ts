import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(async () => {
    // TestBed allows the testing of the Component and template
    await TestBed.configureTestingModule({
      declarations: [HeroComponent],
      // NO_ERRORS_SCHEMA tells Angular not to validate the template/schema
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  });
});
