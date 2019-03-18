import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './projects.actions';

jest.mock('@ngrx/store');

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProjectsComponent],
      providers: [
        {
          provide: Store,
          useValue: new Store(null, null, null)
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have a list of projects', () => {
    expect(element.querySelector('app-projects-list')).toBeTruthy();
  });

  it('should dispatch an action to fetch projects', () => {
    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.FetchProjects());
  });
});
