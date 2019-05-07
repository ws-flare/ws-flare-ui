import { Task } from './task.model';

export const tasksState: TasksState = {
  isFetchingTasks: false,
  isCreatingTask: false,
  tasks: [],
  ciToken: null
};

export interface TasksState {
  isFetchingTasks: boolean;
  isCreatingTask: boolean;
  tasks: Task[];
  ciToken: string;
}
