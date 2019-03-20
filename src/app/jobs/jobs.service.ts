import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';
import { Project } from '../projects/Project.model';

const getJobsQuery = gql`
  query jobs($taskId: String!) {
    jobs(taskId: $taskId) {
      id
      createdAt
      userId
      taskId
      isRunning
      passed
    }
  }
`;

const startJobMutation = gql`
  mutation createJob($taskId: String!) {
    createJob(taskId: $taskId) {
      id
      createdAt
      userId
      taskId
      isRunning
      passed
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private apollo: Apollo) {
  }

  getJobs(taskId: string) {
    return this.apollo.query<FetchResult<Project[]>>({query: getJobsQuery, variables: {taskId}});
  }

  startJob(taskId: string) {
    return this.apollo.mutate<FetchResult<Project>>({mutation: startJobMutation, variables: {taskId}});
  }
}
