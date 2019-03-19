import { tasksState, TasksState } from './tasks.state';
import { TasksActions } from './tasks.actions';
import * as actions from './tasks.actions';

export function reducer(state: TasksState = tasksState, action: TasksActions): TasksState {
  switch (action.type) {
    case actions.FETCH_TASKS:
      return {...state, isFetchingTasks: true};
    case actions.FETCH_TASKS_OK:
      return {...state, isFetchingTasks: false, tasks: action.tasks};
    case actions.FETCH_TASKS_FAIL:
      return {...state, isFetchingTasks: false};
    case actions.CREATE_TASK:
      return {...state, isCreatingTask: true};
    case actions.CREATE_TASK_OK:
      return {...state, isCreatingTask: false, tasks: [action.task, ...state.tasks]};
    case actions.CREATE_TASK_FAIL:
      return {...state, isCreatingTask: false};
    default:
      return state;
  }
}
