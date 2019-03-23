import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Node } from './node.model';
import { FetchResult } from 'apollo-link';

const dataQuery = gql`
  query nodes($jobId: String!) {
    nodes(jobId: $jobId) {
      id
      createdAt
      jobId
      name
      running
      totalSuccessfulConnections
      totalFailedConnections
      totalDroppedConnections
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
    return this.apollo.query<FetchResult<{ nodes: Node[] }>>({query: dataQuery, variables: {jobId}});
  }
}
