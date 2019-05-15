import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as actions from './app.actions';

/**
 * Handles app level redux side effects
 */
@Injectable()
export class AppEffects {

  /**
   * Closes all modals that are on the screen in one action
   */
  @Effect({dispatch: false}) closeAllModals$ = this.actions$.pipe(
    ofType(actions.CLOSE_ALL_MODALS),
    map(() => this.dialog.closeAll())
  );

  constructor(private actions$: Actions, public dialog: MatDialog) {
  }
}
