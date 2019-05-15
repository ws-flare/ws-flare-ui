import { AppState } from '../app.state';
import { JobsState } from './jobs.state';

/**
 * Interface for lazy loaded module
 */
export interface ModuleState extends AppState {
  jobs: JobsState;
}
