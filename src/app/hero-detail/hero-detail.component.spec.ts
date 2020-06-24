import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from '../app-routing.module';
import { By } from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let testId;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes(routes)],
      providers: [{
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: { get: () => testId } } }
      }]
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

  describe('methods with routing usages', () => {
    beforeEach(() => {
      testId = 11;
    });

    describe('getHero', () => {
      it('should get a hero',
        fakeAsync(inject([Router], (router: Router) => {
          fixture.ngZone.run(() => {
            router.navigate([`detail/${testId}`]);
            tick();
            component.getHero();
            tick();
            expect(component.hero).toBeDefined();
          });
        })));
    });

    describe('goBack', () => {
      it('should go to previous path',
        fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
          fixture.ngZone.run(() => {
            router.navigate(['dashboard']);
            tick();
            router.navigate([`detail/${testId}`]);
            tick();
            component.goBack();
            tick();
            expect(location.path()).toBe('/dashboard');
          });
        })));
    });

    afterEach(() => {
      testId = null;
    });
  });
});
