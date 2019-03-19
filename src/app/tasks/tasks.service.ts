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
    }
  }
`;

const createTaskMutation = gql`
  mutation createTask($name: String!) {
    createTask(projectId: $projectId name: $name uri: $uri totalSimulatedUsers: $totalSimulatedUsers runTime: $runTime) {
      id
      userId
      projectId
      name
      uri
      totalSimulatedUsers
      runTime
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
        runTime: task.runTime
      }
    });
  }
}
