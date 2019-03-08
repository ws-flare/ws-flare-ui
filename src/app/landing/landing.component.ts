import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as userActions from '../user/user.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

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
