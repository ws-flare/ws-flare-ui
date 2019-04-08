import { AppState } from '../app.state';
import { SidenavState } from './sidenav.state';

export interface ModuleState extends AppState {
  sidenav: SidenavState;
}

