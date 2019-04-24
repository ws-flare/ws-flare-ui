import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';
import { Job } from '../jobs/job.model';

const dataQuery = gql`
  query job($jobId: String!) {
    job(jobId: $jobId) {
      id
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
      usageTicks {
        gt
        lt
        tick
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

  getData(jobId: string) {
    return this.apollo.watchQuery<FetchResult<{ job: Job }>>({query: dataQuery, variables: {jobId}});
  }
}
