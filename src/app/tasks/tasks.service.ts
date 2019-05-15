import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';
import { Task } from './task.model';
import { CiToken } from './ci-token.model';

// GraphQL query for getting a list of tasks
const tasksQuery = gql`
  query tasks($projectId: String!) {
    tasks(projectId: $projectId) {
      id
      userId
      projectId
      name
      cfApi
      cfUser
      cfPass
      cfOrg
      cfSpace
      cfApps
      scripts
    }
  }
`;

// GraphQL query for generating a ci token
const generateCiTokenQuery = gql`
  query generateCiToken($taskId: String!) {
    generateCiToken(taskId: $taskId) {
      token
    }
  }
`;

// GraphQL mutation for creating a new task
const createTaskMutation = gql`
  mutation createTask($projectId: String! $name: String! $cfApi: String!
  $cfUser: String! $cfPass: String! $cfOrg: String! $cfSpace: String! $cfApps: String! $successThreshold: Int! $scripts: String!) {
    createTask(projectId: $projectId name: $name cfApi: $cfApi
    cfUser: $cfUser cfPass: $cfPass cfOrg: $cfOrg cfSpace: $cfSpace cfApps: $cfApps successThreshold: $successThreshold scripts: $scripts) {
      id
      userId
      projectId
      name
      cfApi
      cfUser
      cfPass
      cfOrg
      cfSpace
      cfApps
      scripts
      successThreshold
    }
  }
`;

/**
 * Service for tasks related activities
 */
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private apollo: Apollo) {
  }

  /**
   * Gets a list of tasks from the server
   *
   * @param projectId - The project id to search for tasks in
   */
  getTasks(projectId: string) {
    return this.apollo.query<FetchResult<Task[]>>({query: tasksQuery, variables: {projectId}});
  }

  /**
   * Creates a new task
   * @param task - The task to create
   */
  createTask(task: Task) {
    return this.apollo.mutate<FetchResult<Task>>({
      mutation: createTaskMutation, variables: {
        projectId: task.projectId,
        name: task.name,
        cfApi: task.cfApi,
        cfUser: task.cfUser,
        cfPass: task.cfPass,
        cfOrg: task.cfOrg,
        cfSpace: task.cfSpace,
        cfApps: task.cfApps,
        successThreshold: task.successThreshold,
        scripts: JSON.stringify(eval(task.scripts))
      }
    });
  }

  /**
   * Generates a new ci JWT token on the server
   * @param taskId - The task id
   */
  generateCiToken(taskId: string) {
    return this.apollo.query<FetchResult<CiToken>>({query: generateCiTokenQuery, variables: {taskId}});
  }
}
