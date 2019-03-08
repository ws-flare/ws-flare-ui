import { User } from './user.model';

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
