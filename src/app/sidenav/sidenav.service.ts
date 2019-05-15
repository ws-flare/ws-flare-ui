import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';
import { Project } from '../projects/Project.model';

/**
 * GraphQL query for getting data to display on the sidenav
 */
const dataQuery = gql`
  query {
    projects {
      id
      name
    }
  }
`;

/**
 * Service for sidenav related activities
 */
@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor(private apollo: Apollo) {
  }

  /**
   * Get data to display on the side nav
   */
  getData() {
    return this.apollo.query<FetchResult<Project[]>>({query: dataQuery});
  }
}
