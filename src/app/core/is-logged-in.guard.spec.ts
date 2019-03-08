import { IsLoggedInGuard } from './is-logged-in.guard';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from '../app.state';
import { cold } from 'jest-marbles';

jest.mock('@angular/router');

describe('IsLoggedInGuard', () => {
  let state = {
    user: {
      isLoggedIn: true,
      isLoggingIn: false
    }
  };

  let store: Store<AppState>;
  let router: Router;
  let gaurd: IsLoggedInGuard;

  beforeEach(() => {
    store = new Store(of(state), null, null);
    router = new Router(null, null, null, null, null, null, null, null);
    gaurd = new IsLoggedInGuard(store, router);
  });

  it('should return true if user is logged in', () => {
    const expected = cold('(true|)');

    expect(gaurd.canActivate()).toBeObservable(expected);
  });

  it('should return false if user is not logged in', () => {
    state = {user: {isLoggedIn: false, isLoggingIn: false}};
    store = new Store(of(state), null, null);
    gaurd = new IsLoggedInGuard(store, router);

    const expected = cold('(false|)');

    expect(gaurd.canActivate()).toBeObservable(expected);
  });
});
