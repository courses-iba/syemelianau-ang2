import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from '../app-routing.module';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HEROES } from '../mock-heroes';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: HeroService;

  const mockHero = HEROES[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        )
      ],
      providers: [HeroService]
    }).compileComponents();
  }));

  describe('without a hero', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(HeroDetailComponent);
      component = fixture.componentInstance;
      heroService = TestBed.inject(HeroService);
      spyOn(heroService, 'getHero').and.returnValue(of(undefined));
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not display details when hero equals undefined', () => {
      const div = fixture.debugElement.query(By.css('div'));
      expect(div).toBeFalsy();
    });
  });

  describe('with a hero', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(HeroDetailComponent);
      component = fixture.componentInstance;
      heroService = TestBed.inject(HeroService);
      spyOn(heroService, 'getHero').and.returnValue(of(mockHero));
      spyOn(heroService, 'updateHero').and.returnValue(of(mockHero));
      fixture.detectChanges();
    });

    it('should render title with hero name', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain(HEROES[0].name.toUpperCase());
    });

    it('should render hero id', () => {
      const div = fixture.debugElement.query(By.css('div div')).nativeElement;
      expect(div.textContent).toContain(`id: ${mockHero.id}`);
    });

    it('should have input with hero name', async () => {
      await fixture.whenStable();
      const input = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(input.value).toBe(mockHero.name);
    });

    it('input element should update hero name', () => {
      const name = 'Fog';
      const oldName = component.hero.name;
      const compiled = fixture.nativeElement;
      const input = compiled.querySelector('input');
      input.value = name;
      fixture.detectChanges();
      input.dispatchEvent(new Event('input'));
      expect(component.hero.name).not.toEqual(oldName);
    });

    describe('getHero', () => {
      it('should get a hero', fakeAsync(inject([], () => {
        component.hero = undefined;
        expect(component.hero).not.toBeDefined();
        component.getHero();
        tick();
        expect(component.hero).toBeDefined();
      })));
    });

    describe('methods with routing usages', () => {
      const previousPath = 'dashboard';
      const currentPath = 'detail/11';

      beforeEach(fakeAsync(inject([Router], (router: Router) => {
        fixture.ngZone.run(() => {
          router.navigate([previousPath]);
          tick();
          router.navigate([currentPath]);
          tick();
        });
      })));

      describe('goBack', () => {
        it('should go to previous path',
          fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
            fixture.ngZone.run(() => {
              expect(location.path()).toBe(`/${currentPath}`);
              component.goBack();
              tick();
              expect(location.path()).toBe(`/${previousPath}`);
            });
          })));
      });

      describe('save', () => {
        it('should go to previous path',
          fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
            fixture.ngZone.run(() => {
              expect(location.path()).toBe(`/${currentPath}`);
              component.save();
              tick();
              expect(location.path()).toBe(`/${previousPath}`);
            });
          })));
      });
    });
  });
});
