import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.state';
import * as actions from './sidenav.actions';
import { Observable } from 'rxjs';
import { Project } from '../projects/Project.model';
import { map } from 'rxjs/operators';

/**
 * Component for displaying a side navigation
 */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  projects$: Observable<Project[]>;

  constructor(private store: Store<ModuleState>) {
    // Get a list of projects from the store
    this.projects$ = store.pipe(map(state => state.sidenav.projects));
  }

  /**
   * Dispatch an action to fetch data to display on this component
   */
  ngOnInit() {
    this.store.dispatch(new actions.FetchData());
  }

}
