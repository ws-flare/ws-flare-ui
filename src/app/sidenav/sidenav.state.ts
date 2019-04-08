import { Project } from '../projects/Project.model';

export const sidenavState: SidenavState = {
  isFetchingData: false,
  projects: []
};

export interface SidenavState {
  isFetchingData: boolean;
  projects: Project[];
}
