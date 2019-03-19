import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './projects.actions';
import { MatDialog } from '@angular/material';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';

jest.mock('@ngrx/store');
jest.mock('@angular/material');

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
        },
        {
          provide: MatDialog,
          useValue: new MatDialog(null, null, null, null, null, null, null)
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

  it('should have a button to create a new project', () => {
    expect(element.querySelector('button#create-project')).not.toBeNull();
  });

  it('should open create project dialog when user clicks the create project button', () => {
    element.querySelector('button#create-project').click();

    expect(MatDialog.prototype.open).toHaveBeenCalledWith(CreateProjectModalComponent, {width: '250px'});
  });
});
