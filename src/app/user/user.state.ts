import { User } from './user.model';

/**
 * Default redux state for the user module
 */
export const userState: UserState = {
  isLoggingIn: false,
  isLoggedIn: false,
  isSigningUp: false,
  user: null,
  loginForm: {
    username: '',
    password: ''
  },
  signupForm: {
    username: '',
    email: '',
    password: ''
  }
};

/**
 * Describes the attributes of the user state in redux
 */
export interface UserState {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  isSigningUp: boolean;
  user: User;
  loginForm: LoginForm;
  signupForm: SignupForm;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface SignupForm {
  username: string;
  email: string;
  password: string;
}
