import * as actions from './sidenav.actions';
import { cold } from 'jest-marbles';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Project } from '../projects/Project.model';
import { SidenavEffects } from './sidenav.effects';
import { SidenavService } from './sidenav.service';

jest.mock('./sidenav.service');
jest.mock('@angular/router');

/**
 * Tests for sidenav.effects
 */
describe('Sidenav Effects', () => {

  const state = {};

  let store: Store<AppState>;

  beforeEach(() => {
    store = new Store(of(state), null, null);
  });

  describe('get data', () => {

    it('should work', () => {
      SidenavService.prototype.getData = jest.fn().mockImplementationOnce(() => of({
        data: {
          projects: [{}, {}, {}]
        }
      }));

      const source = cold('a', {a: new actions.FetchData()});

      const expected = cold('a', {
        a: new actions.UpdateProjects([{}, {}, {}] as Project[])
      });

      const effects = new SidenavEffects(new Actions(source), store, new SidenavService(null));

      expect(effects.getData$).toBeObservable(expected);
    });

    it('should handle errors', () => {
      SidenavService.prototype.getData = jest.fn().mockImplementationOnce(() => of(throwError('ERROR!!!')));

      const source = cold('a', {a: new actions.FetchData()});

      const expected = cold('a', {a: new actions.FetchDataFailed()});

      const effects = new SidenavEffects(new Actions(source), store, new SidenavService(null));

      expect(effects.getData$).toBeObservable(expected);
    });
  });

});
