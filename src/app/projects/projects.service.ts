import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Project } from './Project.model';
import { FetchResult } from 'apollo-link';

const projectsQuery = gql`
  query {
    projects {
      id
      name
    }
  }
`;

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

  getProjects() {
    return this.apollo.query<FetchResult<Project[]>>({query: projectsQuery});
  }

  createProject(name: string) {
    return this.apollo.mutate<FetchResult<Project>>({mutation: createProjectMutation, variables: {name}});
  }
}
