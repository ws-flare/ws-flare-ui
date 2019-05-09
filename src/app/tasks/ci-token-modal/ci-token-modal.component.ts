import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from '../module.state';
import * as appActions from '../../app.actions';
import { Observable } from 'rxjs';
import { CiToken } from '../ci-token.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ci-token-modal',
  templateUrl: './ci-token-modal.component.html',
  styleUrls: ['./ci-token-modal.component.scss']
})
export class CiTokenModalComponent implements OnInit {

  token$: Observable<CiToken>;

  constructor(private store: Store<ModuleState>) {
    console.log('Ahoy there');
    this.token$ = store.pipe(map(state => {
      console.log(state);
      return state.tasks.ciToken;
    }));
  }

  ngOnInit() {
  }

  ok() {
    this.store.dispatch(new appActions.CloseAllModals());
  }

}
