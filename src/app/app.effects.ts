import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as actions from './app.actions';

@Injectable()
export class AppEffects {

  @Effect({dispatch: false}) closeAllModals$ = this.actions$.pipe(
    ofType(actions.CLOSE_ALL_MODALS),
    map(() => this.dialog.closeAll())
  );

  constructor(private actions$: Actions, public dialog: MatDialog) {
  }
}
