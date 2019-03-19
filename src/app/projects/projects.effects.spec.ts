import * as actions from './projects.actions';
import { cold } from 'jest-marbles';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProjectsService } from './projects.service';
import { ProjectsEffects } from './projects.effects';
import { Project } from './Project.model';
import * as appActions from '../app.actions';

jest.mock('./projects.service');
jest.mock('@angular/router');

describe('User Effects', () => {

  const state = {};

  let store: Store<AppState>;

  beforeEach(() => {
    store = new Store(of(state), null, null);
  });

  describe('get projects', () => {

    it('should work', () => {
      ProjectsService.prototype.getProjects = jest.fn().mockImplementationOnce(() => of({data: {projects: [{}, {}, {}]}}));

      const source = cold('a', {a: new actions.FetchProjects()});

      const expected = cold('a', {a: new actions.FetchProjectsOk([{}, {}, {}] as Project[])});

      const effects = new ProjectsEffects(new Actions(source), store, new ProjectsService(null));

      expect(effects.getProjects$).toBeObservable(expected);
    });

    it('should handle errors', () => {
      ProjectsService.prototype.getProjects = jest.fn().mockImplementationOnce(() => of(throwError('ERROR!!!')));

      const source = cold('a', {a: new actions.FetchProjects()});

      const expected = cold('a', {a: new actions.FetchProjectsFail()});

      const effects = new ProjectsEffects(new Actions(source), store, new ProjectsService(null));

      expect(effects.getProjects$).toBeObservable(expected);
    });
  });

  describe('create project', () => {

    it('should work', () => {
      ProjectsService.prototype.createProject = jest.fn().mockImplementationOnce(() => of({
        data: {
          createProject: {
            id: 'abc123',
            name: 'project1'
          }
        }
      }));

      const source = cold('a', {a: new actions.CreateProject('project1')});

      const expected = cold('(ab)', {a: new actions.CreateProjectOk({id: 'abc123', name: 'project1'}), b: new appActions.CloseAllModals()});

      const effects = new ProjectsEffects(new Actions(source), store, new ProjectsService(null));

      expect(effects.createProject$).toBeObservable(expected);
    });
  });

  it('should handle failure', () => {
    ProjectsService.prototype.createProject = jest.fn().mockImplementationOnce(() => of(throwError('ERROR!!!')));

    const source = cold('a', {a: new actions.CreateProject('project1')});

    const expected = cold('a', {a: new actions.CreateProjectFail()});

    const effects = new ProjectsEffects(new Actions(source), store, new ProjectsService(null));

    expect(effects.createProject$).toBeObservable(expected);
  });
});
