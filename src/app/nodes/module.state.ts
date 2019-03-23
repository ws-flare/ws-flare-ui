import { AppState } from '../app.state';
import { NodesState } from './nodes.state';

export interface ModuleState extends AppState {
  nodes: NodesState;
}
