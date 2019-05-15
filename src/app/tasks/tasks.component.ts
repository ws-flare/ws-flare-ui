import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.state';
import * as actions from './tasks.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from './task.model';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';

/**
 * Wrapper component for tasks related components
 */
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(private store: Store<ModuleState>, private route: ActivatedRoute, private dialog: MatDialog) {
    // Read list of tasks from the redux store
    this.tasks$ = store.pipe(map(state => state.tasks.tasks));
  }

  /**
   * Read project id from the store then dispatch an action to fetch tasks in that project
   */
  ngOnInit() {
    this.route.params.subscribe(params => this.store.dispatch(new actions.FetchTasks(params.projectId)));
  }

  /**
   * Open a dialog to create a new task
   */
  openCreateTaskDialog() {
    this.route.params.subscribe(({projectId}) => this.dialog.open(CreateTaskModalComponent, {width: '700px', data: projectId}));
  }

}
