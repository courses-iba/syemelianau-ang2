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

  it(`should have as hero id 1 and hero name 'Windstorm'`, () => {
    expect(component.hero).toEqual({
      id: 1,
      name: 'Windstorm'
    });
  });

  it('should render title with uppercase hero name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(component.hero.name.toUpperCase());
  });

  it('should render 2 div tags', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div').length).toBe(2);
  });

  describe('input element', () => {
    it('should update hero name', (done) => {
      fixture.whenStable().then(() => {
        const name = 'Fog';
        const input = fixture.debugElement.query(By.css('input'));
        const el = input.nativeElement;
        expect(el.value).toBe(component.hero.name);
        el.value = name;
        el.dispatchEvent(new Event('input'));
        expect(fixture.componentInstance.hero.name).toBe(name);
        done();
      });
    });
  });
});
