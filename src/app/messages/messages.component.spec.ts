import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    component.messageService.add('Test');
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(compiled.querySelector('h2').textContent).toContain('Messages');
  });

  it(`should render 'clear' button`, () => {
    expect(compiled.querySelector('button').textContent).toContain('clear');
  });
});
