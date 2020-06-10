import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HeroDetailComponent } from './hero-detail.component';
import { By } from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display details', () => {
    const div = fixture.debugElement.query(By.css('div'));
    expect(div).toBeFalsy();
  });

  describe('after setting a hero', () => {
    const hero = {
      id: 21,
      name: 'Mr Meeseeks'
    };
    let compiled;
    let input;

    beforeEach(() => {
      component.hero = hero;
      compiled = fixture.nativeElement;
      fixture.detectChanges();
      input = compiled.querySelector('input');
      input.dispatchEvent(new Event('input'));
    });

    it('should render title with hero name', () => {
      expect(compiled.querySelector('h2').textContent).toContain(hero.name.toUpperCase());
    });

    it('should render input with hero name', () => {
      expect(input.textContent).toEqual(component.hero.name);
    });

    it('input element should update hero name', () => {
      const name = 'Fog';
      expect(input.textContent).toEqual(fixture.componentInstance.hero.name);
      input.value = name;
      fixture.detectChanges();
      input.dispatchEvent(new Event('input'));
      expect(fixture.componentInstance.hero.name).toEqual(name);
    });
  });
});
