import * as actions from './user.actions';
import {cold} from 'jest-marbles';
import {UserEffects} from './user.effects';
import {Actions} from '@ngrx/effects';
import {UserService} from './user.service';
import {of, throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {Router} from '@angular/router';

jest.mock('./user.service');
jest.mock('@angular/router');

describe('User Effects', () => {

  const state = {
    user: {
      loginForm: {
        username: 'testUser',
        userId: 'abc',
        token: 'testToken'
      },
      signupForm: {
        username: 'testUser',
        email: 'test@test.com',
        password: 'testPass'
      }
    }
  };

  const user = {
    username: 'testUser',
    userId: 'abc',
    token: 'testToken'
  };

  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    store = new Store(of(state), null, null);
    router = new Router(null, null, null, null, null, null, null, null);
  });

  describe('login', () => {
    it('should be able to login', () => {
      UserService.prototype.login = jest.fn().mockImplementationOnce(() => of({data: {login: user}}));
      const source = cold('a', {a: new actions.Login()});

      const expected = cold('a', {a: new actions.LoginOk(user)});

      const effects = new UserEffects(new Actions(source), store, router, new UserService(null));

      expect(effects.login$).toBeObservable(expected);
    });

    it('should handle login failure', () => {
      UserService.prototype.login = jest.fn().mockImplementationOnce(() => throwError('Error'));
      const source = cold('a', {a: new actions.Login()});

      const expected = cold('a', {a: new actions.LoginFail()});

      const effects = new UserEffects(new Actions(source), store, router, new UserService(null));

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('signup', () => {

    it('should be able to signup', () => {
      UserService.prototype.signup = jest.fn().mockImplementationOnce(() => of({data: {signup: user}}));
      const source = cold('a', {a: new actions.Signup()});

      const expected = cold('a', {a: new actions.SignupOk()});

      const effects = new UserEffects(new Actions(source), store, router, new UserService(null));

      expect(effects.signup$).toBeObservable(expected);
    });

    it('should handle signup failure', () => {
      UserService.prototype.signup = jest.fn().mockImplementationOnce(() => throwError('Error'));
      const source = cold('a', {a: new actions.Signup()});

      const expected = cold('a', {a: new actions.SignupFail()});

      const effects = new UserEffects(new Actions(source), store, router, new UserService(null));

      expect(effects.signup$).toBeObservable(expected);
    });
  });
});
