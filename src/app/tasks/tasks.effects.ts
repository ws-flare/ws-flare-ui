import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { TasksService } from './tasks.service';
import * as actions from './tasks.actions';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as appActions from '../app.actions';

@Injectable()
export class TasksEffects {

  @Effect() getTasks$ = this.actions$.pipe(
    ofType<actions.FetchTasks>(actions.FETCH_TASKS),
    mergeMap(({projectId}) =>
      this.service.getTasks(projectId).pipe(
        mergeMap((user) => of(new actions.FetchTasksOk(user.data.tasks))),
        catchError(() => of(new actions.FetchTaskFail()))
      )
    )
  );

  @Effect() createTask$ = this.actions$.pipe(
    ofType<actions.CreateTask>(actions.CREATE_TASK),
    mergeMap(({task}) =>
      this.service.createTask(task).pipe(
        switchMap((user) => [
            new actions.CreateTaskOk(user.data.createTask),
            new appActions.CloseAllModals()
          ]
        ),
        catchError(() => of(new actions.CreateTaskFail()))
      )
    )
  );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private service: TasksService) {
  }

}
