import { Usage } from '../nodes/usage.model';

/**
 * Interface which describes attributes of a Job
 */
export interface Job {
  id: string;
  createdAt: string;
  userId: string;
  taskId: string;
  isRunning: boolean;
  passed: boolean;
  nodes?: Node[];
  usages?: Usage[];
  totalSimulators: number;
}
