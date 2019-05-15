import { Node } from './node.model';
import { Usage } from './usage.model';

/**
 * Defines the default redux state for this module
 */
export const nodesState: NodesState = {
  isFetchingData: false,
  nodes: [],
  usages: {},
  connectedSockets: [],
  totalSimulators: 0
};

/**
 * Defines the attributes of the state for this module
 */
export interface NodesState {
  isFetchingData: boolean;
  nodes: Node[];
  usages: UsagesList;
  connectedSockets: ConnectedSocketTick[];
  totalSimulators: number;
}

export interface UsagesList {
  [key: string]: AppInstance;
}

export interface AppInstance {
  [key: string]: Usage[];
}

export interface ConnectedSocketTick {
  jobId: string;
  gt: string;
  lt: string;
  tick: number;
  connectedSocketCount?: ConnectedSocketCount;
}

export interface ConnectedSocketCount {
  count: number;
}
