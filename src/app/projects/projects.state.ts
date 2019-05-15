import { Project } from './Project.model';

/**
 * The default state for the projects module
 */
export const projectsState: ProjectsState = {
  isFetchingProjects: false,
  isCreatingProject: false,
  projects: []
};

/**
 * Describes the attributes of the state for the projects module
 */
export interface ProjectsState {
  isFetchingProjects: boolean;
  isCreatingProject: boolean;
  projects: Project[];
}
