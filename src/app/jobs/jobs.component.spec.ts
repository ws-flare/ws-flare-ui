import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsComponent } from './jobs.component';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as actions from './jobs.actions';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

jest.mock('@ngrx/store');

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [JobsComponent],
      providers: [
        {
          provide: Store,
          useValue: new Store(null, null, null)
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({taskId: 'abc123'})
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have a list of jobs', () => {
    expect(element.querySelector('app-jobs-list')).not.toBeNull();
  });

  it('should dispatch an action to fetch jobs', () => {
    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.FetchJobs('abc123'));
  });

  it('should have a button to start a new job', () => {
    expect(element.querySelector('button#start-job')).not.toBeNull();
  });

  it('should dispatch an action to start a job when a user clicks the start job button', () => {
    element.querySelector('button#start-job').click();
    
    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.StartJob('abc123'));
  });
});
