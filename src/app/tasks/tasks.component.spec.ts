import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './tasks.actions';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';

jest.mock('@ngrx/store');
jest.mock('@angular/material');

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TasksComponent],
      providers: [
        {
          provide: Store,
          useValue: new Store(null, null, null)
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({projectId: 'abc123'})
          }
        },
        {
          provide: MatDialog,
          useValue: new MatDialog(null, null, null, null, null, null, null)
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have a list of tasks', () => {
    expect(element.querySelector('app-tasks-list')).toBeTruthy();
  });

  it('should dispatch an action to get a list of tasks', () => {
    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.FetchTasks('abc123'));
  });

  it('should have a button to create a new task', () => {
    expect(element.querySelector('button#create-task')).not.toBeNull();
  });

  it('should open create task dialog when user clicks the create project button', () => {
    element.querySelector('button#create-task').click();

    expect(MatDialog.prototype.open).toHaveBeenCalledWith(CreateTaskModalComponent, {width: '250px', data: 'abc123'});
  });
});
