import { AppState } from '../app.state';
import { ProjectsState } from './projects.state';

export interface ModuleState extends AppState {
  projects: ProjectsState;
}
