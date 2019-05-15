import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as actions from '../../user/user.actions';

/**
 * Sign up component which displays a signup form to allow new users access to the site
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  /**
   * Update the username in the redux store
   * @param username - The username the user has entered
   */
  updateUsername(username: string) {
    this.store.dispatch(new actions.UpdateSignupUsername(username));
  }

  /**
   * Update the email in the redux store
   * @param email - The email the user has entered
   */
  updateEmail(email: string) {
    this.store.dispatch(new actions.UpdateSignupEmail(email));
  }

  /**
   * Update the password in the redux store
   * @param password - The password the user has entered
   */
  updatePassword(password: string) {
    this.store.dispatch(new actions.UpdateSignupPassword(password));
  }

  /**
   * Dispatch an action to sign up
   */
  signup() {
    this.store.dispatch(new actions.Signup());
  }
}
