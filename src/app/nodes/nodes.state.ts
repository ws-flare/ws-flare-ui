import { Node } from './node.model';
import { Usage } from './usage.model';

export const nodesState: NodesState = {
  isFetchingData: false,
  nodes: [],
  usages: {},
  connectedSockets: [],
  totalSimulators: 0
};

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
