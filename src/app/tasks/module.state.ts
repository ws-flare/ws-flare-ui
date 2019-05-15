import { AppState } from '../app.state';
import { TasksState } from './tasks.state';

/**
 * Describe the attributes of this module
 */
export interface ModuleState extends AppState {
  tasks: TasksState;
}
