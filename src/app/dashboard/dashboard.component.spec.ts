import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { By } from '@angular/platform-browser';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService: HeroService;

  class MockHero {
    public getHeroes(): Observable<Hero[]> {
      return of(HEROES);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeroSearchComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: HeroService, useClass: MockHero }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heroes', () => {
    expect(component.heroes).toBeTruthy();
  });

  it('should render hero search', () => {
    const heroSearchComponent = fixture.debugElement.query(By.css('app-hero-search'));
    expect(heroSearchComponent).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('should load 4 heroes', () => {
      expect(component.heroes.length).toBe(4);
      component.heroes = [];
      expect(component.heroes.length).toBe(0);
      component.getHeroes();
      expect(component.heroes.length).toBe(4);
    });
  });
});
