import { cold } from 'jest-marbles';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as actions from './jobs.actions';
import { JobsService } from './jobs.service';
import { JobsEffects } from './jobs.effects';
import { Job } from './job.model';

jest.mock('./jobs.service');
jest.mock('@angular/router');

/**
 * Tests for jobs.effects
 */
describe('Tasks Effects', () => {

  const state = {};

  let store: Store<AppState>;

  beforeEach(() => {
    store = new Store(of(state), null, null);
  });

  describe('get jobs', () => {

    it('should work', () => {
      JobsService.prototype.getJobs = jest.fn().mockImplementationOnce(() => of({data: {jobs: [{}, {}, {}]}}));

      const source = cold('a', {a: new actions.FetchJobs('abc123')});

      const expected = cold('a', {a: new actions.FetchJobsOk([{}, {}, {}] as Job[])});

      const effects = new JobsEffects(new Actions(source), store, new JobsService(null));

      expect(effects.getJobs$).toBeObservable(expected);
    });

    it('should handle errors', () => {
      JobsService.prototype.getJobs = jest.fn().mockImplementationOnce(() => of(throwError('ERROR!!!')));

      const source = cold('a', {a: new actions.FetchJobs('abc123')});

      const expected = cold('a', {a: new actions.FetchJobsFail()});

      const effects = new JobsEffects(new Actions(source), store, new JobsService(null));

      expect(effects.getJobs$).toBeObservable(expected);
    });
  });

  describe('create task', () => {

    it('should work', () => {
      JobsService.prototype.startJob = jest.fn().mockImplementationOnce(() => of({
        data: {
          createJob: {
            id: 'abc123'
          }
        }
      }));

      const source = cold('a', {a: new actions.StartJob('job1')});

      const expected = cold('a', {a: new actions.StartJobOk({id: 'abc123'} as Job)});

      const effects = new JobsEffects(new Actions(source), store, new JobsService(null));

      expect(effects.startJob$).toBeObservable(expected);
    });
  });

  it('should handle failure', () => {
    JobsService.prototype.startJob = jest.fn().mockImplementationOnce(() => of(throwError('ERROR!!!')));

    const source = cold('a', {a: new actions.StartJob('abc123')});

    const expected = cold('a', {a: new actions.StartJobFail()});

    const effects = new JobsEffects(new Actions(source), store, new JobsService(null));

    expect(effects.startJob$).toBeObservable(expected);
  });
});
