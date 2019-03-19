import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './tasks.actions';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

jest.mock('@ngrx/store');

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
});
