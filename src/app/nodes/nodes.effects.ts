import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {NodesService} from './nodes.service';
import * as actions from './nodes.actions';
import {catchError, mergeMap, switchMap, takeUntil} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class NodesEffects {

  @Effect() getData$ = this.actions$.pipe(
    ofType<actions.FetchData>(actions.FETCH_DATA),
    switchMap(({jobId}) =>
      this.service.getData(jobId).valueChanges.pipe(
        takeUntil(this.actions$.pipe(ofType(actions.UNSUBSCRIBE_FROM_UPDATES))),
        switchMap((res) => [
          new actions.UpdateNodes(res.data.job.nodes),
          new actions.UpdateUsages(res.data.job.usages),
          new actions.UpdatedConnectedSockets(res.data.job.connectedSocketTimeFrame)
        ]),
        catchError(() => of(new actions.FetchDataFailed()))
      )
    ),
    catchError((err) => {
      console.log(err);
      return of(new actions.FetchDataFailed());
    })
  );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private service: NodesService) {
  }

}
