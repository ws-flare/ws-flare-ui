import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsListComponent } from './jobs-list.component';
import { Job } from '../job.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimeAgoPipe } from 'time-ago-pipe';

/**
 * Tests for jobs-list
 */
describe('JobsListComponent', () => {
  let component: JobsListComponent;
  let fixture: ComponentFixture<JobsListComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [JobsListComponent, TimeAgoPipe]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.jobs = [
      {
        id: 'abc1',
        createdAt: 'Today1',
        isRunning: false,
        passed: true
      },
      {
        id: 'abc2',
        createdAt: 'Today2',
        isRunning: true,
        passed: false
      },
      {
        id: 'abc3',
        createdAt: 'Today3',
        isRunning: false,
        passed: false
      }
    ] as Job[];

    fixture.detectChanges();
  });

  it('should have correct header', () => {
    expect(element.querySelector('mat-list h3').textContent).toContain('Jobs');
  });

  it('should have a list of jobs', () => {
    expect(element.querySelectorAll('mat-list mat-list-item').length).toBe(3);
  });

  it('should have correct date of each job', () => {
    const jobs = element.querySelectorAll('mat-list mat-list-item h4');

    expect(jobs[0].textContent).not.toBeNull();
    expect(jobs[1].textContent).not.toBeNull();
    expect(jobs[2].textContent).not.toBeNull();
  });

  it('should have correct icon on each job', () => {
    const icons = element.querySelectorAll('mat-list mat-list-item mat-icon');

    expect(icons[0].textContent).toContain('done');
    expect(icons[1].textContent).toContain('timer');
    expect(icons[2].textContent).toContain('error');
  });
});
