import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import * as actions from './sidenav.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SidenavService } from './sidenav.service';

@Injectable()
export class SidenavEffects {

  @Effect() getData$ = this.actions$.pipe(
    ofType<actions.FetchData>(actions.FETCH_DATA),
    switchMap(() =>
      this.service.getData().pipe(
        switchMap((res) => [
          new actions.UpdateProjects(res.data.projects)
        ]),
        catchError(() => of(new actions.FetchDataFailed()))
      )
    )
  );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private service: SidenavService) {
  }

}
