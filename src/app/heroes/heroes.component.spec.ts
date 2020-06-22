import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { By } from '@angular/platform-browser';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroDetailComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heroes', () => {
    expect(component.heroes).toBeTruthy();
  });

  it(`should render title 'My Heroes'`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('My Heroes');
  });

  it('should render list of heroes in a li tags', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('li').length).toBe(component.heroes.length);
  });

  it('should render hero details', () => {
    const heroDetailComponent = fixture.debugElement.query(By.css('app-hero-detail'));
    expect(heroDetailComponent).toBeTruthy();
  });

  describe('on list item click', () => {
    it('should change selected hero value', () => {
      const list = fixture.debugElement.queryAll(By.css('li'));
      list.forEach((de) => {
        const el = de.nativeElement;
        const value = component.selectedHero;
        el.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(value).not.toEqual(component.selectedHero);
      });
    });
  });

  describe('onSelect', () => {
    it('should set selectedHero value', fakeAsync(inject([], () => {
      const hero = { id: 11, name: 'Dr Nice' };
      component.onSelect(hero);
      tick();
      expect(component.selectedHero).toEqual(hero);
    })));
  });

  describe('getHeroes', () => {
    it('should get heroes', fakeAsync(inject([], () => {
      component.getHeroes();
      tick();
      expect(component.heroes).toBeDefined();
    })));
  });
});
