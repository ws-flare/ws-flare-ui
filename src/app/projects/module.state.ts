import { AppState } from '../app.state';
import { ProjectsState } from './projects.state';

/**
 * Describes the attributes of this lazy loaded module
 */
export interface ModuleState extends AppState {
  projects: ProjectsState;
}
