import { Action } from '@ngrx/store';
import { Job } from './job.model';

export const FETCH_JOBS = 'jobs/FETCH_JOBS';
export const FETCH_JOBS_OK = 'jobs/FETCH_JOBS_OK';
export const FETCH_JOBS_FAIL = 'jobs/FETCH_JOBS_FAIL';

export const START_JOB = 'jobs/START_JOB';
export const START_JOB_OK = 'jobs/START_JOB_OK';
export const START_JOB_FAIL = 'jobs/START_JOB_FAIL';

/**
 * Job related actions which are used by redux
 */
export class FetchJobs implements Action {
  readonly type = FETCH_JOBS;

  constructor(public taskId: string) {
  }
}

export class FetchJobsOk implements Action {
  readonly type = FETCH_JOBS_OK;

  constructor(public jobs: Job[]) {
  }
}

export class FetchJobsFail implements Action {
  readonly type = FETCH_JOBS_FAIL;
}

export class StartJob implements Action {
  readonly type = START_JOB;

  constructor(public taskId: string) {
  }
}

export class StartJobOk implements Action {
  readonly type = START_JOB_OK;

  constructor(public job: Job) {
  }
}

export class StartJobFail implements Action {
  readonly type = START_JOB_FAIL;
}

export type JobsActions = | FetchJobs | FetchJobsOk | FetchJobsFail | StartJob | StartJobOk | StartJobFail;

