import { Task } from './task.model';
import { CiToken } from './ci-token.model';

/**
 * The default redux state for the tasks module
 */
export const tasksState: TasksState = {
  isFetchingTasks: false,
  isCreatingTask: false,
  tasks: [],
  ciToken: null
};

/**
 * Describes the attributes of the tasks redux state
 */
export interface TasksState {
  isFetchingTasks: boolean;
  isCreatingTask: boolean;
  tasks: Task[];
  ciToken: CiToken;
}
