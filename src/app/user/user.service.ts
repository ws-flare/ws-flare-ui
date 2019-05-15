import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { User } from './user.model';
import { Apollo } from 'apollo-angular';
import { SignupForm } from './user.state';

// GraphQL mutation to login to the application
const loginQuery = gql`
  mutation($username: String! $password: String!) {
    login(username: $username password: $password) {
      userId
      token
      username
    }
  }
`;

// GraphQL mutation to sign up to the application
const signupQuery = gql`
  mutation($username: String! $email: String! $password: String!) {
    signup(username: $username email: $email password: $password) {
      username
    }
  }
`;

/**
 * Service for user related activities
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) {
  }

  /**
   * Login to the application
   * @param username - The username
   * @param password - The password
   */
  login(username, password): Observable<FetchResult<User>> {
    return this.apollo.mutate({
      mutation: loginQuery,
      variables: {username, password}
    });
  }

  /**
   * Singup to the application
   * @param signupForm - The form model in the signup form
   */
  signup(signupForm: SignupForm): Observable<FetchResult<null>> {
    return this.apollo.mutate({
      mutation: signupQuery,
      variables: signupForm
    });
  }
}
