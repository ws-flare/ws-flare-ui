import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SidenavComponent} from './sidenav.component';
import {Store} from '@ngrx/store';
import * as actions from './sidenav.actions';
import {NO_ERRORS_SCHEMA} from '@angular/core';

jest.mock('@ngrx/store');

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidenavComponent],
      providers: [
        {
          provide: Store,
          useValue: new Store(null, null, null)
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have a list of projects', () => {
    expect(element.querySelector('app-projects-list')).not.toBeNull();
  });

  it('should dispatch an action to fetch data', () => {
    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.FetchData());
  });

  it('should have a home button', () => {
    expect(element.querySelector('app-home-button')).not.toBeNull();
  });
});
