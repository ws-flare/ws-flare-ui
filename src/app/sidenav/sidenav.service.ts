import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';
import { Project } from '../projects/Project.model';

const dataQuery = gql`
  query {
    projects {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor(private apollo: Apollo) {
  }

  getData() {
    return this.apollo.query<FetchResult<Project[]>>({query: dataQuery});
  }
}
