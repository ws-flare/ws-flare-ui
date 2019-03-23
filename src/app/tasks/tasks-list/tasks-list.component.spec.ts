import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListComponent } from './tasks-list.component';
import { Task } from '../task.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TasksListComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
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

  it('should have correct name for each task', () => {
    const tasks = element.querySelectorAll('mat-list mat-list-item h4');

    expect(tasks[0].textContent).toContain('task1');
    expect(tasks[1].textContent).toContain('task2');
    expect(tasks[2].textContent).toContain('task3');
  });

  it('should have icons on each task', () => {
    const icons = element.querySelectorAll('mat-list mat-list-item mat-icon');

    expect(icons[0].textContent).toContain('device_hub');
    expect(icons[1].textContent).toContain('device_hub');
    expect(icons[2].textContent).toContain('device_hub');
  });
});
