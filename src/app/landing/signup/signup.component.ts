import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import * as actions from '../../user/user.actions';

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

  updateUsername(username: string) {
    this.store.dispatch(new actions.UpdateSignupUsername(username));
  }

  updateEmail(email: string) {
    this.store.dispatch(new actions.UpdateSignupEmail(email));
  }

  updatePassword(password: string) {
    this.store.dispatch(new actions.UpdateSignupPassword(password));
  }

  signup() {
    this.store.dispatch(new actions.Signup());
  }
}
