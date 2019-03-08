import { Action } from '@ngrx/store';
import { User } from './user.model';

export const LOGIN = 'user/LOGIN';
export const LOGIN_OK = 'user/LOGIN_OK';
export const LOGIN_FAIL = 'user/LOGIN_FAIL';

export const UPDATE_USERNAME = 'user/UPDATE_USERNAME';
export const UPDATE_PASSWORD = 'user/UPDATE_PASSWORD';

export const SIGNUP = 'user/SIGNUP';
export const SIGNUP_OK = 'user/SIGNUP_OK';
export const SIGNUP_FAIL = 'user/SIGNUP_FAIL';

export const UPDATE_SIGNUP_USERNAME = 'user/UPDATE_SIGNUP_USERNAME';
export const UPDATE_SIGNUP_EMAIL = 'user/UPDATE_SIGNUP_EMAIL';
export const UPDATE_SIGNUP_PASSWORD = 'user/UPDATE_SIGNUP_PASSWORD';

export class Login implements Action {
  readonly type = LOGIN;

  constructor() {
  }
}

export class LoginOk implements Action {
  readonly type = LOGIN_OK;

  constructor(public user: User) {
  }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
}

export class UpdateUsername implements Action {
  readonly type = UPDATE_USERNAME;

  constructor(public username: string) {
  }
}

export class UpdatePassword implements Action {
  readonly type = UPDATE_PASSWORD;

  constructor(public password: string) {
  }
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class SignupOk implements Action {
  readonly type = SIGNUP_OK;
}

export class SignupFail implements Action {
  readonly type = SIGNUP_FAIL;
}

export class UpdateSignupUsername implements Action {
  readonly type = UPDATE_SIGNUP_USERNAME;

  constructor(public username: string) {
  }
}

export class UpdateSignupEmail implements Action {
  readonly type = UPDATE_SIGNUP_EMAIL;

  constructor(public email: string) {
  }
}

export class UpdateSignupPassword implements Action {
  readonly type = UPDATE_SIGNUP_PASSWORD;

  constructor(public password: string) {
  }
}

export type UserActions =
  | Login
  | LoginOk
  | LoginFail
  | UpdateUsername
  | UpdatePassword
  | Signup
  | SignupOk
  | SignupFail
  | UpdateSignupUsername
  | UpdateSignupEmail
  | UpdateSignupPassword;
