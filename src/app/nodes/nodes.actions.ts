import { Action } from '@ngrx/store';
import { Node } from './node.model';

export const FETCH_DATA = 'nodes/FETCH_DATA';
export const FETCH_DATA_FAILED = 'nodes/FETCH_DATA_FAILED';

export const UPDATE_NODES = 'nodes/UPDATE_NODES';

export class FetchData implements Action {
  readonly type = FETCH_DATA;

  constructor(public jobId: string) {
  }
}

export class FetchDataFailed implements Action {
  readonly type = FETCH_DATA_FAILED;
}

export class UpdateNodes implements Action {
  readonly type = UPDATE_NODES;

  constructor(public nodes: Node[]) {
  }
}

export type NodesActions = | FetchData | FetchDataFailed | UpdateNodes;
