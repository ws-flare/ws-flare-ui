import * as actions from './jobs.actions';
import { jobsState, JobsState } from './jobs.state';
import { reducer } from './jobs.reducer';
import { Job } from './job.model';

/**
 * Tests for jobs.reducer
 */
describe('Jobs Reducer', () => {

  it('should return same state if action is not recognized', () => {
    const state: JobsState = {...jobsState};
    const action = {type: 'UNKNOWN'} as any;

    expect(reducer(state, action)).toEqual(state);
  });

  it('should fetch a list of jobs', () => {
    const state: JobsState = {...jobsState, isFetchingJobs: false};
    const action = new actions.FetchJobs('task1');

    expect(reducer(state, action)).toEqual({...state, isFetchingJobs: true});
  });

  it('should handle successfully fetched jobs', () => {
    const state: JobsState = {...jobsState, isFetchingJobs: true};
    const action = new actions.FetchJobsOk([{}, {}, {}] as Job[]);

    expect(reducer(state, action)).toEqual({...state, isFetchingJobs: false, jobs: [{}, {}, {}]});
  });

  it('should handle failed fetching of jobs', () => {
    const state: JobsState = {...jobsState, isFetchingJobs: true};
    const action = new actions.FetchJobsFail();

    expect(reducer(state, action)).toEqual({...state, isFetchingJobs: false});
  });

  it('should start a new job', () => {
    const state: JobsState = {...jobsState, isStartingJob: false};
    const action = new actions.StartJob('task1');

    expect(reducer(state, action)).toEqual({...state, isStartingJob: true});
  });

  it('should handle successfully started job', () => {
    const state: JobsState = {...jobsState, isStartingJob: true, jobs: [{id: 'abc1'}] as Job[]};
    const action = new actions.StartJobOk({id: 'abc2'} as Job);

    expect(reducer(state, action)).toEqual({...state, isStartingJob: false, jobs: [{id: 'abc2'}, {id: 'abc1'}]});
  });

  it('should handle failed starting of job', () => {
    const state: JobsState = {...jobsState, isStartingJob: true};
    const action = new actions.StartJobFail();

    expect(reducer(state, action)).toEqual({...state, isStartingJob: false});
  });
});
