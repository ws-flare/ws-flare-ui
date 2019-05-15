import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from './jobs.actions';
import { JobsService } from './jobs.service';

/**
 * Handles job related side effects in redux
 */
@Injectable()
export class JobsEffects {

  /**
   * Gets a list of jobs from the server
   */
  @Effect() getJobs$ = this.actions$.pipe(
    ofType<actions.FetchJobs>(actions.FETCH_JOBS),
    mergeMap(({taskId}) =>
      this.service.getJobs(taskId).pipe(
        mergeMap((user) => of(new actions.FetchJobsOk(user.data.jobs))),
        catchError(() => of(new actions.FetchJobsFail()))
      )
    )
  );

  /**
   * Starts a new job
   */
  @Effect() startJob$ = this.actions$.pipe(
    ofType<actions.StartJob>(actions.START_JOB),
    mergeMap(({taskId}) =>
      this.service.startJob(taskId).pipe(
        mergeMap((user) => of(new actions.StartJobOk(user.data.createJob))),
        catchError(() => of(new actions.StartJobFail()))
      )
    )
  );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private service: JobsService) {
  }

}
