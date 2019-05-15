import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { ModuleState } from '../module.state';
import * as actions from '../tasks.actions';
import { CiTokenModalComponent } from '../ci-token-modal/ci-token-modal.component';

/**
 * Component for displaying a list of tasks
 */
@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  // Takes a list of tasks as input
  @Input() tasks: Task[];

  constructor(private store: Store<ModuleState>, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  /**
   * Open the generate ci token modal when the user wants to generate a new token
   * @param taskId - The task id to generate the token for
   */
  generateCiToken(taskId: string) {
    this.dialog.open(CiTokenModalComponent, {width: '700px'});
    this.store.dispatch(new actions.GenerateCiToken(taskId));
  }
}
