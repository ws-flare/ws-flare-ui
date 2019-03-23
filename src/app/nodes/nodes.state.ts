import { Node } from './node.model';

export const nodesState: NodesState = {
  isFetchingData: false,
  nodes: []
};

export interface NodesState {
  isFetchingData: boolean;
  nodes: Node[];
}
