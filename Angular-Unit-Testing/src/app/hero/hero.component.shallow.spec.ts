import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

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
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    fixture.detectChanges();
    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  });

  it('should render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

    // bindings set above won't be reflected in the template until change detection is triggered
    fixture.detectChanges();

    // find the anchor tag and check if it contains the hero name
    // the nativeElement property gives access to the DOM element
    // querySelector is a method to find an element in the DOM, here the anchor tag
    expect(fixture.nativeElement.querySelector('a').textContent).toContain(
      'SuperDude'
    );

    // Using debugElement to query the DOM anchor element, same as above
    expect(
      fixture.debugElement.query(By.css('a')).nativeElement.textContent
    ).toContain('SuperDude');
  });
});
