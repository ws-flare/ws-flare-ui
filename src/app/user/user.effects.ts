import {Injectable} from '@angular/core';
import * as actions from './user.actions';
import {mergeMap, catchError, withLatestFrom, map} from 'rxjs/operators';
import {Effect, ofType, Actions} from '@ngrx/effects';
import {of} from 'rxjs';
import {UserService} from './user.service';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

@Injectable()
export class UserEffects {

  @Effect() login$ = this.actions$.pipe(
    ofType(actions.LOGIN),
    withLatestFrom(this.store$),
    map(([_, store]) => store.user.loginForm),
    mergeMap((loginForm) =>
      this.userService.login(loginForm.username, loginForm.password).pipe(
        mergeMap((user) => {
          this.router.navigate(['/cf-spaces']);
          return of(new actions.LoginOk(user.data.login));
        }),
        catchError(() => of(new actions.LoginFail()))
      )
    )
  );

  @Effect() signup$ = this.actions$.pipe(
    ofType(actions.SIGNUP),
    withLatestFrom(this.store$),
    map(([_, store]) => store.user.signupForm),
    mergeMap((signupForm) =>
      this.userService.signup(signupForm).pipe(
        mergeMap(() => of(new actions.SignupOk())),
        catchError(() => of(new actions.SignupFail()))
      )
    )
  );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private router: Router,
              private userService: UserService) {
  }

}
