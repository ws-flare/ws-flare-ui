import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

jest.mock('@ngrx/store');

/**
 * Tests for app.component
 */
describe('AppComponent', () => {

  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: new Store(null, null, null)
        },
      ]
    });
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    element = fixture.nativeElement;
  });

  it('should have a router outlet', () => {
    expect(element.querySelector('router-outlet')).not.toBeNull();
  });

  it('should have a nav bar', () => {
    expect(element.querySelector('app-nav')).not.toBeNull();
  });

  it('should have a sidenav', () => {
    expect(element.querySelector('mat-sidenav-container mat-sidenav app-sidenav')).not.toBeNull();
  });
});
