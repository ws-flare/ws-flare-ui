import { AppState } from '../app.state';
import { TasksState } from './tasks.state';

export interface ModuleState extends AppState {
  tasks: TasksState
}
