import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeButtonComponent} from './home-button.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('HomeButtonComponent', () => {
  let component: HomeButtonComponent;
  let fixture: ComponentFixture<HomeButtonComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeButtonComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeButtonComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have a home button', () => {
    expect(element.querySelector('button')).not.toBeNull();
  });

  it('should have correct link on home button', () => {
    expect(element.querySelector('button').attributes.getNamedItem('routerLink').value).toBe('/projects');
  });
});
