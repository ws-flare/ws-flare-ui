import { AppState } from '../app.state';
import { JobsState } from './jobs.state';

export interface ModuleState extends AppState {
  jobs: JobsState;
}
