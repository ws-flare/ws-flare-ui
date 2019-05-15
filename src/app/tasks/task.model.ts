/**
 * Describe the attributes of the task model
 */
export interface Task {
  id?: string;
  userId?: string;
  projectId: string;
  name: string;
  scripts: string;
  cfApi?: string;
  cfUser?: string;
  cfPass?: string;
  cfOrg?: string;
  cfSpace?: string;
  cfApps?: string;
  successThreshold: number;
}
