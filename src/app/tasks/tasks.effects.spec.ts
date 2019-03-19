import * as actions from './tasks.actions';
import { cold } from 'jest-marbles';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { TasksService } from './tasks.service';
import { TasksEffects } from './tasks.effects';
import { Task } from './task.model';
import * as appActions from '../app.actions';

jest.mock('./tasks.service');
jest.mock('@angular/router');

describe('Tasks Effects', () => {

  const state = {};

  let store: Store<AppState>;

  beforeEach(() => {
    store = new Store(of(state), null, null);
  });

  describe('get tasks', () => {

    it('should work', () => {
      TasksService.prototype.getTasks = jest.fn().mockImplementationOnce(() => of({data: {tasks: [{}, {}, {}]}}));

      const source = cold('a', {a: new actions.FetchTasks('abc123')});

      const expected = cold('a', {a: new actions.FetchTasksOk([{}, {}, {}] as Task[])});

      const effects = new TasksEffects(new Actions(source), store, new TasksService(null));

      expect(effects.getTasks$).toBeObservable(expected);
    });

    it('should handle errors', () => {
      TasksService.prototype.getTasks = jest.fn().mockImplementationOnce(() => of(throwError('ERROR!!!')));

      const source = cold('a', {a: new actions.FetchTasks('abc123')});

      const expected = cold('a', {a: new actions.FetchTaskFail()});

      const effects = new TasksEffects(new Actions(source), store, new TasksService(null));

      expect(effects.getTasks$).toBeObservable(expected);
    });
  });

  describe('create task', () => {

    it('should work', () => {
      TasksService.prototype.createTask = jest.fn().mockImplementationOnce(() => of({
        data: {
          createTask: {
            id: 'abc123',
            name: 'task1'
          }
        }
      }));

      const source = cold('a', {a: new actions.CreateTask({name: 'task1'} as Task)});

      const expected = cold('(ab)', {
        a: new actions.CreateTaskOk({id: 'abc123', name: 'task1'} as Task),
        b: new appActions.CloseAllModals()
      });

      const effects = new TasksEffects(new Actions(source), store, new TasksService(null));

      expect(effects.createTask$).toBeObservable(expected);
    });
  });

  it('should handle failure', () => {
    TasksService.prototype.createTask = jest.fn().mockImplementationOnce(() => of(throwError('ERROR!!!')));

    const source = cold('a', {a: new actions.CreateTask({id: 'abc123', name: 'task1'} as Task)});

    const expected = cold('a', {a: new actions.CreateTaskFail()});

    const effects = new TasksEffects(new Actions(source), store, new TasksService(null));

    expect(effects.createTask$).toBeObservable(expected);
  });
});
