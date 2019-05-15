import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';

/**
 * Router guard that will protect certain routes in the application
 * from users who are not logged in
 */
@Injectable()
export class IsLoggedInGuard implements CanActivate {

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.isLoggedIn$ = store.pipe(map(state => state.user.isLoggedIn));
  }

  canActivate(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      mergeMap(isLoggedIn => {
        // If the user is not logged in then redirect to the home screen
        if (!isLoggedIn) {
          this.router.navigate(['/home']);
          return of(false);
        }

        // If the user is logged in then proceed to the selected route
        return of(true);
      }));
  }
}

