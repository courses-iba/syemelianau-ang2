import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';
import { By } from '@angular/platform-browser';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: HeroService;

  const mockName = 'Mr Meeseeks';
  const mockHero = { id: 21, name: mockName };
  const mockHeroes = HEROES;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
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
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    spyOn(heroService, 'getHeroes').and.returnValue(of(mockHeroes));
    spyOn(heroService, 'addHero').and.returnValue(of(mockHero));
    spyOn(heroService, 'deleteHero').and.returnValue(of(mockHeroes[3]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heroes array', () => {
    expect(component.heroes).toBeTruthy();
  });

  it(`should render title 'My Heroes'`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('My Heroes');
  });

  describe('getHeroes', () => {
    it('should get heroes', fakeAsync(inject([], () => {
      component.heroes = undefined;
      expect(component.heroes).not.toBeDefined();
      component.getHeroes();
      tick();
      expect(component.heroes).toBeDefined();
    })));
  });

  describe('add', () => {
    it('should add the hero', fakeAsync(inject([], () => {
      component.add(mockName);
      tick();
      expect(component.heroes).toContain(mockHero);
    })));
  });

  describe('delete', () => {
    it('should delete the hero', fakeAsync(inject([], () => {
      component.delete(mockHeroes[3]);
      tick();
      expect(component.heroes).not.toContain(mockHeroes[3]);
    })));
  });

  it('clicking the delete button removes the hero from the list and calls deleteHero', () => {
    const delButton = fixture.debugElement.query(By.css('button.delete')).nativeElement;
    delButton.click();
    fixture.detectChanges();
    const links = fixture.debugElement
      .queryAll(By.css('a'))
      .map((a) => a.nativeElement);
    expect(links.length).toBe(mockHeroes.length - 1);
    expect(links[0].textContent).toContain(`${mockHeroes[1].id} ${mockHeroes[1].name}`);
    expect(links[0].getAttribute('href')).toBe('/detail/12');
    expect(heroService.deleteHero).toHaveBeenCalled();
  });

  it(`clicking the add button on a an empty text box doesn't add to the list`, () => {
    const addButton = fixture.debugElement.query(By.css('div > button')).nativeElement;
    addButton.click();
    fixture.detectChanges();
    expect(heroService.addHero).not.toHaveBeenCalled();
  });
});
