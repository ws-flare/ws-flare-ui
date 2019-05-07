import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListComponent } from './tasks-list.component';
import { Task } from '../task.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatMenuModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { CiTokenModalComponent } from '../ci-token-modal/ci-token-modal.component';
import * as actions from '../tasks.actions';

jest.mock('@ngrx/store');
jest.mock('@angular/material');

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let element;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [],
      declarations: [TasksListComponent],
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
    fixture = TestBed.createComponent(TasksListComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.tasks = [
      {id: 'abc1', name: 'task1'},
      {id: 'abc2', name: 'task2'},
      {id: 'abc3', name: 'task3'}
    ] as Task[];

    fixture.detectChanges();
  });

  it('should have correct header', () => {
    expect(element.querySelector('mat-list h3').textContent).toContain('Tasks');
  });

  it('should have a list of tasks', () => {
    expect(element.querySelectorAll('mat-list mat-list-item').length).toBe(3);
  });

  it('should have a dropdown options list for each task', () => {
    expect(element.querySelectorAll('mat-menu').length).toBe(3);
  });

  it('should have correct name for each task', () => {
    const tasks = element.querySelectorAll('mat-list mat-list-item h4');

    expect(tasks[0].textContent).toContain('task1');
    expect(tasks[1].textContent).toContain('task2');
    expect(tasks[2].textContent).toContain('task3');
  });

  it('should generate CI token', () => {
    component.generateCiToken('abc123');

    expect(MatDialog.prototype.open).toHaveBeenCalledWith(CiTokenModalComponent, {width: '700px'});
    expect(store.dispatch).toHaveBeenCalledWith(new actions.GenerateCiToken('abc123'));
  });
});
