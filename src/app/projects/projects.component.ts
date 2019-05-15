import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.state';
import { Observable } from 'rxjs';
import { Project } from './Project.model';
import { map } from 'rxjs/operators';
import * as actions from './projects.actions';
import { MatDialog } from '@angular/material';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';

/**
 * Wrapper component for project related items
 */
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects$: Observable<Project[]>;
  isFetchingProjects$: Observable<boolean>;

  constructor(private store: Store<ModuleState>, private dialog: MatDialog) {
    // Read list of projects from the store
    this.projects$ = store.pipe(map(state => state.projects.projects));

    // Check if user is fetching projects
    this.isFetchingProjects$ = store.pipe(map(state => state.projects.isFetchingProjects));
  }

  /**
   * Dispatch an action to fetch projects when this component loads
   */
  ngOnInit() {
    this.store.dispatch(new actions.FetchProjects());
  }

  /**
   * Display the create project modal dialog component
   */
  openCreateProjectDialog() {
    this.dialog.open(CreateProjectModalComponent, {width: '500px'});
  }

}
