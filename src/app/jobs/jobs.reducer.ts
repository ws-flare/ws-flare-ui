import { jobsState, JobsState } from './jobs.state';
import { JobsActions } from './jobs.actions';
import * as actions from './jobs.actions';

export function reducer(state: JobsState = jobsState, action: JobsActions): JobsState {
  switch (action.type) {
    case actions.FETCH_JOBS:
      return {...state, isFetchingJobs: true};
    case actions.FETCH_JOBS_OK:
      return {...state, isFetchingJobs: false, jobs: action.jobs};
    case actions.FETCH_JOBS_FAIL:
      return {...state, isFetchingJobs: false};
    case actions.START_JOB:
      return {...state, isStartingJob: true};
    case actions.START_JOB_OK:
      return {...state, isStartingJob: false, jobs: [action.job, ...state.jobs]};
    case actions.START_JOB_FAIL:
      return {...state, isStartingJob: false};
    default:
      return state;
  }
}
