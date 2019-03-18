import { Action } from '@ngrx/store';
import { Project } from './Project.model';

export const FETCH_PROJECTS = 'projects/FETCH_PROJECTS';
export const FETCH_PROJECT_OK = 'projects/FETCH_PROJECT_OK';
export const FETCH_PROJECT_FAIL = 'projects/FETCH_PROJECT_FAIL';

export const CREATE_PROJECT = 'projects/CREATE_PROJECT';
export const CREATE_PROJECT_OK = 'projects/CREATE_PROJECT_OK';
export const CREATE_PROJECT_FAIL = 'projects/CREATE_PROJECT_FAIL';

export class FetchProjects implements Action {
  readonly type = FETCH_PROJECTS;
}

export class FetchProjectsOk implements Action {
  readonly type = FETCH_PROJECT_OK;

  constructor(public projects: Project[]) {
  }
}

export class FetchProjectsFail implements Action {
  readonly type = FETCH_PROJECT_FAIL;
}

export class CreateProject implements Action {
  readonly type = CREATE_PROJECT;

  constructor(public name: string) {
  }
}

export class CreateProjectOk implements Action {
  readonly type = CREATE_PROJECT_OK;

  constructor(public project: Project) {
  }
}

export class CreateProjectFail implements Action {
  readonly type = CREATE_PROJECT_FAIL;
}

export type ProjectsActions = | FetchProjects | FetchProjectsOk | FetchProjectsFail | CreateProject | CreateProjectOk | CreateProjectFail;
