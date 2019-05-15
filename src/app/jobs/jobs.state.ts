import { Job } from './job.model';

/**
 * The default state of the jobs module
 */
export const jobsState: JobsState = {
  isFetchingJobs: false,
  isStartingJob: false,
  jobs: []
};

/**
 * Interface describing the attributes of the jobs state
 */
export interface JobsState {
  isFetchingJobs: boolean;
  isStartingJob: boolean;
  jobs: Job[];
}
