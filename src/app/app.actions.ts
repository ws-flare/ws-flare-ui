import { Action } from '@ngrx/store';

export const CLOSE_ALL_MODALS = 'app/CLOSE_ALL_MODALS';

export class CloseAllModals implements Action {
  readonly type = CLOSE_ALL_MODALS;
}

export type AppActions = | CloseAllModals;
