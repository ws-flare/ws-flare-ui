import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectModalComponent } from './create-project-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as appActions from '../../app.actions';
import * as actions from '../projects.actions';

jest.mock('@ngrx/store');

describe('CreateProjectModalComponent', () => {
  let component: CreateProjectModalComponent;
  let fixture: ComponentFixture<CreateProjectModalComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [CreateProjectModalComponent],
      providers: [
        {
          provide: Store,
          useValue: new Store(null, null, null)
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectModalComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have correct modal header', () => {
    expect(element.querySelector('h2').textContent).toBe('Create Project');
  });

  it('should have an input for project name', () => {
    expect(element.querySelector('input#name')).not.toBeNull();
  });

  it('should have a cancel button', () => {
    expect(element.querySelectorAll('button')[0].textContent).toContain('Cancel');
  });

  it('should have a create button', () => {
    expect(element.querySelectorAll('button')[1].textContent).toContain('Submit');
  });

  it('should close the modal when the user clicks cancel', () => {
    element.querySelectorAll('button')[0].click();

    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new appActions.CloseAllModals());
  });

  it('should dispatch an action to create project when user clicks submit', () => {
    component.form.controls['name'].setValue('project1');

    element.querySelectorAll('button')[1].click();

    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.CreateProject('project1'));
  });
});
