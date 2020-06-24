import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HEROES } from '../mock-heroes';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroDetailComponent],
      imports: [RouterTestingModule],
      providers: [HeroService]
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

  describe('getHeroes', () => {
    let heroService: HeroService;

    beforeEach(() => {
      heroService = TestBed.inject(HeroService);
      spyOn(heroService, 'getHeroes').and.returnValue(of(HEROES));
    });

    it('should get heroes', fakeAsync(inject([], () => {
      component.heroes = undefined;
      expect(component.heroes).not.toBeDefined();
      component.getHeroes();
      tick();
      expect(component.heroes).toBeDefined();
    })));
  });
});
