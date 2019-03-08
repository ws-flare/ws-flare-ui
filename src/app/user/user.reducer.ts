import { userState, UserState } from './user.state';
import { UserActions } from './user.actions';
import * as actions from './user.actions';

export function reducer(state: UserState = userState, action: UserActions) {
  switch (action.type) {
    case actions.LOGIN:
      return {...state, isLoggingIn: true};
    case actions.LOGIN_OK:
      return {...state, isLoggingIn: false, user: action.user, isLoggedIn: true};
    case actions.LOGIN_FAIL:
      return {...state, isLoggingIn: false};
    case actions.UPDATE_USERNAME:
      return {...state, loginForm: {...state.loginForm, username: action.username}};
    case actions.UPDATE_PASSWORD:
      return {...state, loginForm: {...state.loginForm, password: action.password}};
    case actions.SIGNUP:
      return {...state, isSigningUp: true};
    case actions.SIGNUP_OK:
      return {...state, isSigningUp: false};
    case actions.SIGNUP_FAIL:
      return {...state, isSigningUp: false};
    case actions.UPDATE_SIGNUP_USERNAME:
      return {...state, signupForm: {...state.signupForm, username: action.username}};
    case actions.UPDATE_SIGNUP_EMAIL:
      return {...state, signupForm: {...state.signupForm, email: action.email}};
    case actions.UPDATE_SIGNUP_PASSWORD:
      return {...state, signupForm: {...state.signupForm, password: action.password}};
    default:
      return state;
  }
}
