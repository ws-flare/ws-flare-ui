import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.state';
import { Observable } from 'rxjs';
import { Project } from './Project.model';
import { map } from 'rxjs/operators';
import * as actions from './projects.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects$: Observable<Project[]>;
  isFetchingProjects$: Observable<boolean>;

  constructor(private store: Store<ModuleState>) {
    this.projects$ = store.pipe(map(state => state.projects.projects));
    this.isFetchingProjects$ = store.pipe(map(state => state.projects.isFetchingProjects));
  }

  ngOnInit() {
    this.store.dispatch(new actions.FetchProjects());
  }

}
