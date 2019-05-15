import { Component } from '@angular/core';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Root component for the application
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    // Reads if the user is logged in from the store
    this.isLoggedIn$ = store.pipe(map(state => state.user.isLoggedIn));
  }
}
