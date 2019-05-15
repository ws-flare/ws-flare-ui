import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from '../module.state';
import * as appActions from '../../app.actions';
import { Observable } from 'rxjs';
import { CiToken } from '../ci-token.model';
import { map } from 'rxjs/operators';

/**
 * Component for generating a ci token to be used with ws-flare-cli
 */
@Component({
  selector: 'app-ci-token-modal',
  templateUrl: './ci-token-modal.component.html',
  styleUrls: ['./ci-token-modal.component.scss']
})
export class CiTokenModalComponent implements OnInit {

  token$: Observable<CiToken>;

  constructor(private store: Store<ModuleState>) {
    // Read the token from the state
    this.token$ = store.pipe(map(state => state.tasks.ciToken));
  }

  ngOnInit() {
  }

  /**
   * When the user clicks ok then close the modal
   */
  ok() {
    this.store.dispatch(new appActions.CloseAllModals());
  }

}
