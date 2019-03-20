import { Job } from './job.model';

export const jobsState: JobsState = {
  isFetchingJobs: false,
  isStartingJob: false,
  jobs: []
};

export interface JobsState {
  isFetchingJobs: boolean;
  isStartingJob: boolean;
  jobs: Job[];
}
