import { AppState } from '../app.state';
import { NodesState } from './nodes.state';

// Define attributes of this module
export interface ModuleState extends AppState {
  nodes: NodesState;
}
