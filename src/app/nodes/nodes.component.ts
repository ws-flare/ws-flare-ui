import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.state';
import { Observable } from 'rxjs';
import { Node } from './node.model';
import { map } from 'rxjs/operators';
import * as actions from './nodes.actions';
import { ActivatedRoute } from '@angular/router';
import { UsagesList } from './nodes.state';

/**
 * Nodes wrapper component
 */
@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit, OnDestroy {

  nodes$: Observable<Node[]>;
  usages$: Observable<UsagesList>;

  constructor(private store: Store<ModuleState>, private route: ActivatedRoute) {
    // Get list of nodes from the store
    this.nodes$ = store.pipe(map(state => state.nodes.nodes));

    // Get usages from the store to populate graph visualization
    this.usages$ = store.pipe(map(state => state.nodes.usages));
  }

  /**
   * Read job id from browser url and dispatch an action to get data from server
   */
  ngOnInit() {
    this.route.params.subscribe(({jobId}) => this.store.dispatch(new actions.FetchData(jobId)));
  }

  /**
   * Unsubscribe from updates when this component is no longer active
   */
  ngOnDestroy() {
    this.store.dispatch(new actions.UnsubscribeFromUpdates());
  }
}
