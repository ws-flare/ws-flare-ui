import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsListComponent } from './jobs-list.component';
import { Job } from '../job.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('JobsListComponent', () => {
  let component: JobsListComponent;
  let fixture: ComponentFixture<JobsListComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [JobsListComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.jobs = [
      {
        id: 'abc1',
        createdAt: 'Today1'
      },
      {
        id: 'abc2',
        createdAt: 'Today2'
      },
      {
        id: 'abc3',
        createdAt: 'Today3'
      }
    ] as Job[];

    fixture.detectChanges();
  });

  it('should have a list of jobs', () => {
    expect(element.querySelectorAll('mat-list mat-list-item').length).toBe(3);
  });

  it('should have correct date of each job', () => {
    const jobs = element.querySelectorAll('mat-list mat-list-item');

    expect(jobs[0].textContent).toContain('Today1');
    expect(jobs[1].textContent).toContain('Today2');
    expect(jobs[2].textContent).toContain('Today3');
  });
});
