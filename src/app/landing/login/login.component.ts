import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as userActions from '../../user/user.actions';

/**
 * Login component which displays a login form
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private store: Store<AppState>) {
  }

  /**
   * Dispatches an action to update the username in the redux store
   * @param username - The username that the user has entered
   */
  updateUsername(username: string) {
    this.store.dispatch(new userActions.UpdateUsername(username));
  }

  /**
   * Dispatches an action to update the password in the redux store
   * @param password - The password that the user has enered
   */
  updatePassword(password: string) {
    this.store.dispatch(new userActions.UpdatePassword(password));
  }

  /**
   * Dispatches an action to login
   */
  login() {
    this.store.dispatch(new userActions.Login());
  }

}
