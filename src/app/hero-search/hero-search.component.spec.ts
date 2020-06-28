import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { By } from '@angular/platform-browser';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        )
      ],
      providers: [HeroService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with an empty list', () => {
    const links = fixture.debugElement
      .queryAll(By.css('a'))
      .map(a => a.nativeElement);
    expect(links.length).toBe(0);
  });

  it(`Typing on the input box doesn't change the list for 299ms`, fakeAsync(() => {
    const heroServiceStub = TestBed.inject(HeroService);
    spyOn(heroServiceStub, 'searchHeroes').and.returnValue(of(HEROES));
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'A';
    input.dispatchEvent(new Event('input'));
    tick(299);
    fixture.detectChanges();
    const links = fixture.debugElement
      .queryAll(By.css('a'))
      .map(a => a.nativeElement);
    expect(links.length).toBe(0);
    discardPeriodicTasks();
  }));

  it('the list of matching heroes appears after 300ms', fakeAsync(() => {
    const heroServiceStub = TestBed.inject(HeroService);
    spyOn(heroServiceStub, 'searchHeroes').and.returnValue(of(HEROES));
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'D';
    input.dispatchEvent(new Event('input'));
    tick(300);
    fixture.detectChanges();
    const links = fixture.debugElement
      .queryAll(By.css('a'))
      .map(a => a.nativeElement);
    expect(links.length).toBe(HEROES.length);
    expect(links[0].textContent).toContain(HEROES[0].name);
  }));

  describe('search', () => {
    it(`doesn't perform a search if the search term doesn't change`, fakeAsync(() => {
      const heroServiceStub = TestBed.inject(HeroService);
      spyOn(heroServiceStub, 'searchHeroes').and.callFake(
        term => of(HEROES.filter(hero => hero.name.includes(term)))
      );
      component.search('D');
      tick(300);
      fixture.detectChanges();
      component.search('D');
      tick(300);
      fixture.detectChanges();
      expect(heroServiceStub.searchHeroes).toHaveBeenCalledTimes(1);
    }));
  });
});
