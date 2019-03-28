import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';
import { Task } from './task.model';

const tasksQuery = gql`
  query tasks($projectId: String!) {
    tasks(projectId: $projectId) {
      id
      userId
      projectId
      name
      uri
      totalSimulatedUsers
      runTime
      cfApi
      cfUser
      cfPass
      cfOrg
      cfSpace
      cfApps
    }
  }
`;

const createTaskMutation = gql`
  mutation createTask($projectId: String! $name: String! $uri: String! $totalSimulatedUsers: Int! $runTime: Int! $cfApi: String!
  $cfUser: String! $cfPass: String! $cfOrg: String! $cfSpace: String! $cfApps: String!) {
    createTask(projectId: $projectId name: $name uri: $uri totalSimulatedUsers: $totalSimulatedUsers runTime: $runTime cfApi: $cfApi
    cfUser: $cfUser cfPass: $cfPass cfOrg: $cfOrg cfSpace: $cfSpace cfApps: $cfApps) {
      id
      userId
      projectId
      name
      uri
      totalSimulatedUsers
      runTime
      cfApi
      cfUser
      cfPass
      cfOrg
      cfSpace
      cfApps
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private apollo: Apollo) {
  }

  getTasks(projectId: string) {
    return this.apollo.query<FetchResult<Task[]>>({query: tasksQuery, variables: {projectId}});
  }

  createTask(task: Task) {
    return this.apollo.mutate<FetchResult<Task>>({
      mutation: createTaskMutation, variables: {
        projectId: task.projectId,
        name: task.name,
        uri: task.uri,
        totalSimulatedUsers: task.totalSimulatedUsers,
        runTime: task.runTime,
        cfApi: task.cfApi,
        cfUser: task.cfUser,
        cfPass: task.cfPass,
        cfOrg: task.cfOrg,
        cfSpace: task.cfSpace,
        cfApps: task.cfApps
      }
    });
  }
}
