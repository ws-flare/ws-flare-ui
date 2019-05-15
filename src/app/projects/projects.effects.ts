import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { ProjectsService } from './projects.service';
import * as actions from './projects.actions';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as appActions from '../app.actions';

/**
 * Handles redux side effects for projects related actions
 */
@Injectable()
export class ProjectsEffects {

  /**
   * Gets a list of projects from the server
   */
  @Effect() getProjects$ = this.actions$.pipe(
    ofType(actions.FETCH_PROJECTS),
    mergeMap(() =>
      this.service.getProjects().pipe(
        mergeMap((user) => of(new actions.FetchProjectsOk(user.data.projects))),
        catchError(() => of(new actions.FetchProjectsFail()))
      )
    )
  );

  /**
   * Creates a new project on the server
   */
  @Effect() createProject$ = this.actions$.pipe(
    ofType<actions.CreateProject>(actions.CREATE_PROJECT),
    mergeMap(({name}) =>
      this.service.createProject(name).pipe(
        switchMap((user) => [
            new actions.CreateProjectOk(user.data.createProject),
            new appActions.CloseAllModals()
          ]
        ),
        catchError(() => of(new actions.CreateProjectFail()))
      )
    )
  );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private service: ProjectsService) {
  }

}
