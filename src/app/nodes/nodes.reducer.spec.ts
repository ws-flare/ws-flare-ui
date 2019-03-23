import { nodesState, NodesState } from './nodes.state';
import { reducer } from './nodes.reducer';
import * as actions from './nodes.actions';
import { Node } from './node.model';

describe('Nodes Reducer', () => {

  it('should return same state if action is not recognized', () => {
    const state: NodesState = {...nodesState};
    const action = {type: 'UNKNOWN'} as any;

    expect(reducer(state, action)).toEqual(state);
  });

  it('should get data for nodes', () => {
    const state: NodesState = {...nodesState, isFetchingData: false};
    const action = new actions.FetchData('abc123');

    expect(reducer(state, action)).toEqual({...state, isFetchingData: true});
  });

  it('should handle failed fetch of data', () => {
    const state: NodesState = {...nodesState, isFetchingData: true};
    const action = new actions.FetchDataFailed();

    expect(reducer(state, action)).toEqual({...state, isFetchingData: false});
  });

  it('should update nodes', () => {
    const state: NodesState = {...nodesState, isFetchingData: true, nodes: []};
    const action = new actions.UpdateNodes([{}, {}, {}] as Node[]);

    expect(reducer(state, action)).toEqual({...state, isFetchingData: false, nodes: [{}, {}, {}]});
  });
});
