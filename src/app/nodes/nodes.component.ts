import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.state';
import { Observable } from 'rxjs';
import { Node } from './node.model';
import { map } from 'rxjs/operators';
import * as actions from './nodes.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit {

  nodes$: Observable<Node[]>;

  constructor(private store: Store<ModuleState>, private route: ActivatedRoute) {
    this.nodes$ = store.pipe(map(state => state.nodes.nodes));
  }

  ngOnInit() {
    this.route.params.subscribe(({jobId}) => this.store.dispatch(new actions.FetchData(jobId)));
  }

}
