import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
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

  it('should not display details', () => {
    const div = fixture.debugElement.query(By.css('div'));
    expect(div).toBeFalsy();
  });

  describe('on list item click', () => {
    const index = 0;
    let list;
    let el;

    beforeEach(() => {
      list = fixture.debugElement.queryAll(By.css('li'));
      el = list[index].nativeElement;
      el.dispatchEvent(new Event('click'));
      fixture.detectChanges();
    });

    it('should display details', () => {
      const div = fixture.debugElement.query(By.css('div'));
      expect(div).toBeTruthy();
    });

    it('input element should update hero name', () => {
      const name = 'Fog';
      const input = fixture.debugElement.query(By.css('input'));
      const inputEl = input.nativeElement;
      expect(el.textContent).toContain(fixture.componentInstance.selectedHero.name);
      inputEl.value = name;
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.textContent).toContain(name);
    });
  });
});
