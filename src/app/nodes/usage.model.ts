/**
 * Defines the attributes in the Usage model
 */
export interface Usage {
  id: string;
  jobId: string;
  appId: string;
  mem: number;
  cpu: number;
  disk: number;
  mem_quota: number;
  disk_quota: number;
  instance: number;
  time: string;
  state: string;
  uptime: number;
  name: string;
}
