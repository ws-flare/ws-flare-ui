import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.state';
import * as actions from './sidenav.actions';
import { Observable } from 'rxjs';
import { Project } from '../projects/Project.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  projects$: Observable<Project[]>;

  constructor(private store: Store<ModuleState>) {
    this.projects$ = store.pipe(map(state => state.sidenav.projects));
  }

  ngOnInit() {
    this.store.dispatch(new actions.FetchData());
  }

}
