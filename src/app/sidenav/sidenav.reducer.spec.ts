import { sidenavState, SidenavState } from './sidenav.state';
import { reducer } from './sidenav.reducer';
import * as actions from './sidenav.actions';
import { Project } from '../projects/Project.model';
import * as projectActions from '../projects/projects.actions';

/**
 * Tests for sidenav.reducer
 */
describe('Sidenav Reducer', () => {

  it('should return same state if action is not recognized', () => {
    const state: SidenavState = {...sidenavState};
    const action = {type: 'UNKNOWN'} as any;

    expect(reducer(state, action)).toEqual({...state});
  });

  it('should fetch data', () => {
    const state: SidenavState = {...sidenavState, isFetchingData: false};
    const action = new actions.FetchData();

    expect(reducer(state, action)).toEqual({...state, isFetchingData: true});
  });

  it('should update projects', () => {
    const state: SidenavState = {...sidenavState, isFetchingData: true, projects: []};
    const action = new actions.UpdateProjects([{}, {}, {}] as Project[]);

    expect(reducer(state, action)).toEqual({...state, isFetchingData: false, projects: [{}, {}, {}]});
  });

  it('should add project to the list when created', () => {
    const state: SidenavState = {...sidenavState, projects: [{id: 'abc1'}, {id: 'abc2'}] as Project[]};
    const action = new projectActions.CreateProjectOk({id: 'abc3'} as Project);

    expect(reducer(state, action)).toEqual({...state, projects: [{id: 'abc3'}, {id: 'abc1'}, {id: 'abc2'}]});
  });
});
