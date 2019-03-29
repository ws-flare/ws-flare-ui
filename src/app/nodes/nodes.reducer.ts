import { nodesState, NodesState } from './nodes.state';
import { NodesActions } from './nodes.actions';
import * as actions from './nodes.actions';

export function reducer(state: NodesState = nodesState, action: NodesActions): NodesState {
  switch (action.type) {
    case actions.FETCH_DATA:
      return {...state, isFetchingData: true};
    case actions.FETCH_DATA_FAILED:
      return {...state, isFetchingData: false};
    case actions.UPDATE_NODES:
      return {...state, isFetchingData: false, nodes: action.nodes};
    case actions.UPDATE_USAGES:
      const usages = {};
      action.usages.forEach(usage => {
        usages[usage.appId] = usages[usage.appId] ? [...usages[usage.appId], usage] : [usage];
      });
      return {...state, usages};
    default:
      return state;
  }
}
