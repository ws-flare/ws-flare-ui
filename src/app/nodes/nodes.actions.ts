import {Action} from '@ngrx/store';
import {Node} from './node.model';
import {Usage} from './usage.model';
import {ConnectedSocketTick} from './nodes.state';

export const FETCH_DATA = 'nodes/FETCH_DATA';
export const FETCH_DATA_FAILED = 'nodes/FETCH_DATA_FAILED';

export const UPDATE_NODES = 'nodes/UPDATE_NODES';
export const UPDATE_USAGES = 'nodes/UPDATE_USAGES';
export const UPDATE_CONNECTED_SOCKETS = 'nodes/UPDATE_CONNECTED_SOCKETS';

export const UNSUBSCRIBE_FROM_UPDATES = 'nodes/UNSUBSCRIBE_FROM_UPDATES';

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

export class UpdateUsages implements Action {
  readonly type = UPDATE_USAGES;

  constructor(public usages: Usage[]) {
  }
}

export class UpdatedConnectedSockets implements Action {
  readonly type = UPDATE_CONNECTED_SOCKETS;

  constructor(public sockets: ConnectedSocketTick[]) {
  }
}

export class UnsubscribeFromUpdates implements Action {
  readonly type = UNSUBSCRIBE_FROM_UPDATES;
}

export type NodesActions =
  | FetchData
  | FetchDataFailed
  | UpdateNodes
  | UpdateUsages
  | UnsubscribeFromUpdates
  | UpdatedConnectedSockets;
