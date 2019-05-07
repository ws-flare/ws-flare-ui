import { Action } from '@ngrx/store';
import { Task } from './task.model';
import { CiToken } from './ci-token.model';

export const FETCH_TASKS = 'tasks/FETCH_TASKS';
export const FETCH_TASKS_OK = 'tasks/FETCH_TASKS_OK';
export const FETCH_TASKS_FAIL = 'tasks/FETCH_TASKS_FAIL';

export const CREATE_TASK = 'tasks/CREATE_TASK';
export const CREATE_TASK_OK = 'tasks/CREATE_TASK_OK';
export const CREATE_TASK_FAIL = 'tasks/CREATE_TASK_FAIL';

export const GENERATE_CI_TOKEN = 'tasks/GENERATE_CI_TOKEN';
export const GENERATE_CI_TOKEN_OK = 'tasks/GENERATE_CI_TOKEN_OK';
export const GENERATE_CI_TOKEN_FAIL = 'tasks/GENERATE_CI_TOKEN_FAIL';

export class FetchTasks implements Action {
  readonly type = FETCH_TASKS;

  constructor(public projectId: string) {
  }
}

export class FetchTasksOk implements Action {
  readonly type = FETCH_TASKS_OK;

  constructor(public tasks: Task[]) {
  }
}

export class FetchTaskFail implements Action {
  readonly type = FETCH_TASKS_FAIL;
}

export class CreateTask implements Action {
  readonly type = CREATE_TASK;

  constructor(public task: Task) {
  }
}

export class CreateTaskOk implements Action {
  readonly type = CREATE_TASK_OK;

  constructor(public task: Task) {
  }
}

export class CreateTaskFail implements Action {
  readonly type = CREATE_TASK_FAIL;
}

export class GenerateCiToken implements Action {
  readonly type = GENERATE_CI_TOKEN;

  constructor(public taskId: string) {
  }
}

export class GenerateCiTokenOk implements Action {
  readonly type = GENERATE_CI_TOKEN_OK;

  constructor(public token: CiToken) {
  }
}

export class GenerateCiTokenFail implements Action {
  readonly type = GENERATE_CI_TOKEN_FAIL;
}

export type TasksActions =
  | FetchTasks
  | FetchTasksOk
  | FetchTaskFail
  | CreateTask
  | CreateTaskOk
  | CreateTaskFail
  | GenerateCiToken
  | GenerateCiTokenOk
  | GenerateCiTokenFail;
