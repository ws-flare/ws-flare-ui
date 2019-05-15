import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';
import { Project } from '../projects/Project.model';

/**
 * GraphQL query for getting a list of jobs
 */
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

/**
 * GraphQL mutation for starting a new job
 */
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

/**
 * Service for jobs related tasks
 */
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private apollo: Apollo) {
  }

  /**
   * Gets a list of jobs in a task
   *
   * @param taskId - The task id that we are trying to find jobs from
   */
  getJobs(taskId: string) {
    return this.apollo.query<FetchResult<Project[]>>({query: getJobsQuery, variables: {taskId}});
  }

  /**
   * Instructs the backend to start a new job
   *
   * @param taskId - The id of the task that we want to start a new job in
   */
  startJob(taskId: string) {
    return this.apollo.mutate<FetchResult<Project>>({mutation: startJobMutation, variables: {taskId}});
  }
}
