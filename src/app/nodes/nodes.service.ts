import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';
import { Job } from '../jobs/job.model';

// Graphql query for getting data for this module
const dataQuery = gql`
  query job($jobId: String!) {
    job(jobId: $jobId) {
      id
      totalSimulators
      isRunning
      passed
      nodes {
        id
        createdAt
        jobId
        name
        running
        totalSuccessfulConnections
        totalFailedConnections
        totalDroppedConnections
      }
      usages {
        id
        jobId
        appId
        mem
        cpu
        disk
        mem_quota
        disk_quota
        instance
        time
        state
        uptime
        name
      }
      connectedSocketTimeFrame {
        gt
        lt
        tick
        connectedSocketCount {
          count
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  constructor(private apollo: Apollo) {
  }

  /**
   * Gets the data from the server for this module and its graph visualizations
   * @param jobId - The job id to search for
   */
  getData(jobId: string) {
    return this.apollo.watchQuery<FetchResult<{ job: Job }>>({query: dataQuery, variables: {jobId}});
  }
}
