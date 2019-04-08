import { sidenavState, SidenavState } from './sidenav.state';
import { SidenavActions } from './sidenav.actions';
import * as actions from './sidenav.actions';

export function reducer(state: SidenavState = sidenavState, action: SidenavActions): SidenavState {
  switch (action.type) {
    case actions.FETCH_DATA:
      return {...state, isFetchingData: true};
    case actions.UPDATE_PROJECTS:
      return {...state, isFetchingData: false, projects: action.projects};
    default:
      return state;
  }
}
