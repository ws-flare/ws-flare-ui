import { nodesState, NodesState } from './nodes.state';
import { NodesActions } from './nodes.actions';
import * as actions from './nodes.actions';

/**
 * Handles logic for nodes module in redux reducer
 * @param state - The current state
 * @param action - The action that occurred
 * @returns state = The new state
 */
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

      action.usages.sort((a, b) => {
        return Number(new Date(a.time)) - Number(new Date(b.time));
      });

      action.usages.forEach(usage => {
        if (usages[usage.appId]) {
          if (usages[usage.appId][usage.instance]) {
            usages[usage.appId][usage.instance].push(usage);
          } else {
            usages[usage.appId][usage.instance] = [usage];
          }
        } else {
          usages[usage.appId] = {[usage.instance]: [usage]};
        }
      });
      return {...state, usages};
    case actions.UPDATE_CONNECTED_SOCKETS:
      return {...state, connectedSockets: action.sockets};
    case actions.UPDATE_TOTAL_SIMULATORS:
      return {...state, totalSimulators: action.totalSimulators};
    default:
      return state;
  }
}
