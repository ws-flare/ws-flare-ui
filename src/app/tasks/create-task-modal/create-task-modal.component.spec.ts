import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskModalComponent } from './create-task-modal.component';
import { Store } from '@ngrx/store';
import * as appActions from '../../app.actions';
import * as actions from '../tasks.actions';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

jest.mock('@ngrx/store');

/**
 * Tests for create-task-modal.component
 */
describe('CreateTaskModalComponent', () => {
  let component: CreateTaskModalComponent;
  let fixture: ComponentFixture<CreateTaskModalComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [CreateTaskModalComponent],
      providers: [
        {
          provide: Store,
          useValue: new Store(null, null, null)
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: 'abc123'
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskModalComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have correct modal header', () => {
    expect(element.querySelector('h2').textContent).toBe('Create Task');
  });

  it('should have an input for project name', () => {
    expect(element.querySelector('input#name')).not.toBeNull();
  });

  it('should have an input for cf api', () => {
    expect(element.querySelector('input#cfApi')).not.toBeNull();
  });

  it('should have an input for cf user', () => {
    expect(element.querySelector('input#cfUser')).not.toBeNull();
  });

  it('should have an input for cf pass', () => {
    expect(element.querySelector('input#cfPass')).not.toBeNull();
  });

  it('should have an input for cf org', () => {
    expect(element.querySelector('input#cfOrg')).not.toBeNull();
  });

  it('should have an input for cf space', () => {
    expect(element.querySelector('input#cfSpace')).not.toBeNull();
  });

  it('should have an input for cf apps', () => {
    expect(element.querySelector('input#cfApps')).not.toBeNull();
  });

  it('should have a cancel button', () => {
    expect(element.querySelectorAll('button')[0].textContent).toContain('Cancel');
  });

  it('should have a create button', () => {
    expect(element.querySelectorAll('button')[1].textContent).toContain('Submit');
  });

  it('should have a monaco editor for scripts', () => {
    expect(element.querySelector('monaco-editor')).not.toBeNull();
  });

  it('should close the modal when the user clicks cancel', () => {
    element.querySelectorAll('button')[0].click();

    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new appActions.CloseAllModals());
  });

  it('should dispatch an action to create project when user clicks submit', () => {
    component.form.controls['name'].setValue('task1');
    component.form.controls['cfApi'].setValue('http://cf.com');
    component.form.controls['cfUser'].setValue('user1');
    component.form.controls['cfPass'].setValue('pass1');
    component.form.controls['cfOrg'].setValue('org1');
    component.form.controls['cfSpace'].setValue('space1');
    component.form.controls['cfApps'].setValue('app1,app2,app3');
    component.form.controls['successThreshold'].setValue(80);
    component.scripts = JSON.stringify([{}]);

    element.querySelectorAll('button')[1].click();

    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.CreateTask({
      projectId: 'abc123',
      name: 'task1',
      cfApi: 'http://cf.com',
      cfUser: 'user1',
      cfPass: 'pass1',
      cfOrg: 'org1',
      cfSpace: 'space1',
      cfApps: 'app1,app2,app3',
      successThreshold: 80,
      scripts: JSON.stringify([{}])
    }));
  });
});
