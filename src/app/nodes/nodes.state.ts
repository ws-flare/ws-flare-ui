import {Node} from './node.model';
import {Usage} from './usage.model';

export const nodesState: NodesState = {
  isFetchingData: false,
  nodes: [],
  usages: {}
};

export interface NodesState {
  isFetchingData: boolean;
  nodes: Node[];
  usages: UsagesList;
}

export interface UsagesList {
  [key: string]: AppInstance;
}

export interface AppInstance {
  [key: string]: Usage[]
}
