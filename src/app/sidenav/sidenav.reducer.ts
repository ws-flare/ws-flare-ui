import { sidenavState, SidenavState } from './sidenav.state';
import { SidenavActions } from './sidenav.actions';
import * as actions from './sidenav.actions';
import { ProjectsActions } from '../projects/projects.actions';
import * as projectActions from '../projects/projects.actions';

/**
 * Handles state logic in redux for this sidenav module
 * @param state - The current state
 * @param action - The action that has occurred
 * @returns state - The new state
 */
export function reducer(state: SidenavState = sidenavState, action: SidenavActions | ProjectsActions): SidenavState {
  switch (action.type) {
    case actions.FETCH_DATA:
      return {...state, isFetchingData: true};
    case actions.UPDATE_PROJECTS:
      return {...state, isFetchingData: false, projects: action.projects};
    case projectActions.CREATE_PROJECT_OK:
      return {...state, projects: [action.project, ...state.projects]};
    default:
      return state;
  }
}
