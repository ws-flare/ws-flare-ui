import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class IsLoggedInGuard implements CanActivate {

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.isLoggedIn$ = store.pipe(map(state => state.user.isLoggedIn));
  }

  canActivate(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      mergeMap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/home']);
          return of(false);
        }

        return of(true);
      }));
  }
}

