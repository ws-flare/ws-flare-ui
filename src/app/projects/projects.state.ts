import { Project } from './Project.model';

export const projectsState: ProjectsState = {
  isFetchingProjects: false,
  isCreatingProject: false,
  projects: []
};

export interface ProjectsState {
  isFetchingProjects: boolean;
  isCreatingProject: boolean;
  projects: Project[];
}
