import { Task } from './task.model';

export const tasksState: TasksState = {
  isFetchingTasks: false,
  isCreatingTask: false,
  tasks: []
};

export interface TasksState {
  isFetchingTasks: boolean;
  isCreatingTask: boolean;
  tasks: Task[];
}
