import * as actions from './projects.actions';
import { ProjectsState, projectsState } from './projects.state';
import { reducer } from './projects.reducer';
import { Project } from './Project.model';

describe('Projects Reducer', () => {

  it('should return same state if action is unknown', () => {
    const state = {...projectsState};
    const action = {type: 'UNKNOWN'} as any;

    expect(reducer(state, action)).toEqual(state);
  });

  it('should fetch projects', () => {
    const state: ProjectsState = {...projectsState, isFetchingProjects: false};
    const action = new actions.FetchProjects();

    expect(reducer(state, action)).toEqual({...projectsState, isFetchingProjects: true});
  });

  it('should handle successful fetch of projects', () => {
    const state: ProjectsState = {...projectsState, isFetchingProjects: true, projects: []};
    const action = new actions.FetchProjectsOk([{}, {}, {}] as Project[]);

    expect(reducer(state, action)).toEqual({...projectsState, isFetchingProjects: false, projects: [{}, {}, {}]});
  });

  it('should handle failed fetch of projects', () => {
    const state: ProjectsState = {...projectsState, isFetchingProjects: true, projects: []};
    const action = new actions.FetchProjectsFail();

    expect(reducer(state, action)).toEqual({...projectsState, isFetchingProjects: false, projects: []});
  });

  it('should create project', () => {
    const state: ProjectsState = {...projectsState, isCreatingProject: false};
    const action = new actions.CreateProject('project1');

    expect(reducer(state, action)).toEqual({...state, isCreatingProject: true});
  });

  it('should handle successful project creation', () => {
    const state: ProjectsState = {...projectsState, isCreatingProject: true, projects: [{id: 'id1', name: 'project1'}]};
    const action = new actions.CreateProjectOk({id: 'id2', name: 'project2'});

    expect(reducer(state, action)).toEqual({
      ...state,
      isCreatingProject: false,
      projects: [{id: 'id2', name: 'project2'}, {id: 'id1', name: 'project1'}]
    });
  });

  it('should handle failed project creation', () => {
    const state: ProjectsState = {...projectsState, isCreatingProject: true};
    const action = new actions.CreateProjectFail();

    expect(reducer(state, action)).toEqual({...state, isCreatingProject: false});
  });
});
