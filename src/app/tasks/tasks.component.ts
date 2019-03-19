import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.state';
import * as actions from './tasks.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from './task.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(private store: Store<ModuleState>, private route: ActivatedRoute) {
    this.tasks$ = store.pipe(map(state => state.tasks.tasks));
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.store.dispatch(new actions.FetchTasks(params.projectId)));
  }

}
