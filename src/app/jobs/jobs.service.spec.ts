import { async, TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { Job } from './job.model';
import { JobsService } from './jobs.service';

jest.mock('apollo-angular');

/**
 * Tests for jobs service
 */
describe('JobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should get a list of jobs', async(() => {
    Apollo.prototype.query = jest.fn().mockImplementationOnce(() => of([{}, {}, {}] as Job[]));

    const service = new JobsService(new Apollo(null, null));

    service.getJobs('task1').subscribe(response => {
      expect(response).toEqual([{}, {}, {}] as Job[]);
    });
  }));

  it('should start a new job', () => {
    Apollo.prototype.mutate = jest.fn().mockImplementationOnce(() => of({id: 'abc123', name: 'job1'}));

    const service = new JobsService(new Apollo(null, null));

    service.startJob('task1').subscribe(response => {
      expect(response).toEqual({id: 'abc123', name: 'project1'});
    });
  });
});
