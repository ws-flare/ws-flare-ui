import { projectsState, ProjectsState } from './projects.state';
import { ProjectsActions } from './projects.actions';
import * as actions from './projects.actions';

export function reducer(state: ProjectsState = projectsState, action: ProjectsActions): ProjectsState {
  switch (action.type) {
    case actions.FETCH_PROJECTS:
      return {...state, isFetchingProjects: true};
    case actions.FETCH_PROJECT_OK:
      return {...state, isFetchingProjects: false, projects: action.projects};
    case actions.FETCH_PROJECT_FAIL:
      return {...state, isFetchingProjects: false};
    case actions.CREATE_PROJECT:
      return {...state, isCreatingProject: true};
    case actions.CREATE_PROJECT_OK:
      return {...state, isCreatingProject: false, projects: [action.project, ...state.projects]};
    case actions.CREATE_PROJECT_FAIL:
      return {...state, isCreatingProject: false};
    default:
      return state;
  }
}
