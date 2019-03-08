import {async} from '@angular/core/testing';
import {UserService} from './user.service';
import {Apollo} from 'apollo-angular';
import {of} from 'rxjs';
import {SignupForm} from './user.state';

jest.mock('apollo-angular');

describe('UserService', () => {

  const user = {
    username: 'testUser',
    userId: 'abc',
    token: 'testToken'
  };

  const signupForm: SignupForm = {
    username: 'testUser',
    email: 'test@test.com',
    password: 'testPass'
  };

  let service: UserService;

  beforeEach(() => {
    Apollo.prototype.mutate = jest.fn().mockImplementationOnce(() => of(user));

    service = new UserService(new Apollo(null, null));
  });

  it('should be able to login', async(() => {
    service.login('testUser', 'testPassword').subscribe((newUser) => {
      expect(newUser).toEqual(user);
    });
  }));

  it('should be able to signup', async(() => {
    service.signup(signupForm).subscribe((newUser) => {
      expect(newUser).toEqual(user);
    });
  }));
});
