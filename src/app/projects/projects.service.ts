import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Project } from './Project.model';
import { FetchResult } from 'apollo-link';

/**
 * GraphQL query for getting a list of projects
 */
const projectsQuery = gql`
  query {
    projects {
      id
      name
    }
  }
`;

/**
 * GraphQL mutation for creating a new project
 */
const createProjectMutation = gql`
  mutation createProject($name: String!) {
    createProject(name: $name) {
      id
      userId
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private apollo: Apollo) {
  }

  /**
   * Gets a list of projects from the server
   */
  getProjects() {
    return this.apollo.query<FetchResult<Project[]>>({query: projectsQuery});
  }

  /**
   * Creates a new project on the server
   * @param name - The name of the project
   */
  createProject(name: string) {
    return this.apollo.mutate<FetchResult<Project>>({mutation: createProjectMutation, variables: {name}});
  }
}
