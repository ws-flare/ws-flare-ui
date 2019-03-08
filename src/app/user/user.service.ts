import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {FetchResult} from 'apollo-link';
import {User} from './user.model';
import {Apollo} from 'apollo-angular';
import {SignupForm} from './user.state';

const loginQuery = gql`
  mutation($username: String! $password: String!) {
    login(username: $username password: $password) {
      userId
      token
      username
    }
  }
`;

const signupQuery = gql`
  mutation($username: String! $email: String! $password: String!) {
    signup(username: $username email: $email password: $password) {
      username
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) {
  }

  login(username, password): Observable<FetchResult<User>> {
    return this.apollo.mutate({
      mutation: loginQuery,
      variables: {username, password}
    });
  }

  signup(signupForm: SignupForm): Observable<FetchResult<null>> {
    return this.apollo.mutate({
      mutation: signupQuery,
      variables: signupForm
    });
  }
}
