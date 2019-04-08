import { Action } from '@ngrx/store';
import { Project } from '../projects/Project.model';

export const FETCH_DATA = 'sidenav/FETCH_DATA';
export const FETCH_DATA_FAILED = 'sidenav/FETCH_DATA_FAILED';

export const UPDATE_PROJECTS = 'sidenav/UPDATE_PROJECTS';

export class FetchData implements Action {
  readonly type = FETCH_DATA;
}

export class FetchDataFailed implements Action {
  readonly type = FETCH_DATA_FAILED;
}

export class UpdateProjects implements Action {
  readonly type = UPDATE_PROJECTS;

  constructor(public projects: Project[]) {
  }
}

export type SidenavActions = | FetchData | FetchDataFailed | UpdateProjects;
