import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as userActions from '../../user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private store: Store<AppState>) {
  }

  updateUsername(username: string) {
    this.store.dispatch(new userActions.UpdateUsername(username));
  }

  updatePassword(password: string) {
    this.store.dispatch(new userActions.UpdatePassword(password));
  }

  login() {
    this.store.dispatch(new userActions.Login());
  }

}
