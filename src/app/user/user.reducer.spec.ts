import { reducer } from './user.reducer';
import { UserState, userState } from './user.state';
import * as actions from './user.actions';

describe('User Reducer', () => {

  it('should be able to login', () => {
    const state: UserState = {...userState, isLoggingIn: false};
    const action = new actions.Login();

    expect(reducer(state, action)).toEqual({...state, isLoggingIn: true});
  });

  it('should log the user in', () => {
    const user = {username: 'test', userId: 'abc123', token: 'abc1234'};
    const state: UserState = {...userState, isLoggingIn: true, user: null};
    const action = new actions.LoginOk(user);

    expect(reducer(state, action)).toEqual({...state, isLoggingIn: false, user, isLoggedIn: true});
  });

  it('should inform user user if login failed', () => {
    const state: UserState = {...userState, isLoggingIn: true};
    const action = new actions.LoginFail();

    expect(reducer(state, action)).toEqual({...state, isLoggingIn: false});
  });

  it('should update username', () => {
    const state: UserState = {...userState, loginForm: {...userState.loginForm, username: ''}};
    const action = new actions.UpdateUsername('testUser');

    expect(reducer(state, action)).toEqual({...state, loginForm: {...state.loginForm, username: 'testUser'}});
  });

  it('should update password', () => {
    const state: UserState = {...userState, loginForm: {...userState.loginForm, password: ''}};
    const action = new actions.UpdatePassword('testPass');

    expect(reducer(state, action)).toEqual({...state, loginForm: {...state.loginForm, password: 'testPass'}});
  });

  it('should allow a user to signup', () => {
    const state: UserState = {...userState, isSigningUp: false};
    const action = new actions.Signup();

    expect(reducer(state, action)).toEqual({...state, isSigningUp: true});
  });

  it('should let a user know that signing up was successful', () => {
    const state: UserState = {...userState, isSigningUp: true};
    const action = new actions.SignupOk();

    expect(reducer(state, action)).toEqual({...state, isSigningUp: false});
  });

  it('should let the user know if signing up has failed', () => {
    const state: UserState = {...userState, isSigningUp: true};
    const action = new actions.SignupFail();

    expect(reducer(state, action)).toEqual({...userState, isSigningUp: false});
  });

  it('should update username on signup form', () => {
    const state: UserState = {...userState};
    const action = new actions.UpdateSignupUsername('test');

    expect(reducer(state, action)).toEqual({...userState, signupForm: {...userState.signupForm, username: 'test'}});
  });

  it('should update email on signup form', () => {
    const state: UserState = {...userState};
    const action = new actions.UpdateSignupEmail('test@test.com');

    expect(reducer(state, action)).toEqual({...userState, signupForm: {...userState.signupForm, email: 'test@test.com'}});
  });

  it('should update password on signup form', () => {
    const state: UserState = {...userState};
    const action = new actions.UpdateSignupPassword('testPass');

    expect(reducer(state, action)).toEqual({...userState, signupForm: {...userState.signupForm, password: 'testPass'}});
  });
});
