import * as actions from './nodes.actions';
import { cold } from 'jest-marbles';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { NodesService } from './nodes.service';
import { NodesEffects } from './nodes.effects';
import { Node } from './node.model';
import { Usage } from './usage.model';
import { ConnectedSocketTick } from './nodes.state';

jest.mock('./nodes.service');
jest.mock('@angular/router');

/**
 * Tests for nodes.effects
 */
describe('User Effects', () => {

  const state = {};

  let store: Store<AppState>;

  beforeEach(() => {
    store = new Store(of(state), null, null);
  });

  describe('get data', () => {

    it('should work', () => {
      NodesService.prototype.getData = jest.fn().mockImplementationOnce(() => ({
        valueChanges: of({
          data: {
            job: {
              totalSimulators: 250,
              nodes: [{}, {}, {}],
              usages: [{}, {}],
              connectedSocketTimeFrame: [{}, {}]
            }
          }
        })
      }));

      const source = cold('a', {a: new actions.FetchData('abc123')});

      const expected = cold('(abcd)', {
        a: new actions.UpdateNodes([{}, {}, {}] as Node[]),
        b: new actions.UpdateUsages([{}, {}] as Usage[]),
        c: new actions.UpdatedConnectedSockets([{}, {}] as ConnectedSocketTick[]),
        d: new actions.UpdateTotalSimulators(250)
      });

      const effects = new NodesEffects(new Actions(source), store, new NodesService(null));

      expect(effects.getData$).toBeObservable(expected);
    });

    it('should handle errors', () => {
      NodesService.prototype.getData = jest.fn().mockImplementationOnce(() => ({valueChanges: of(throwError('ERROR!!!'))}));

      const source = cold('a', {a: new actions.FetchData('abc123')});

      const expected = cold('a', {a: new actions.FetchDataFailed()});

      const effects = new NodesEffects(new Actions(source), store, new NodesService(null));

      expect(effects.getData$).toBeObservable(expected);
    });
  });

});
