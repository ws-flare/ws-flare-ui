import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.state';
import { Observable } from 'rxjs';
import { Job } from './job.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as actions from './jobs.actions';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs$: Observable<Job[]>;

  constructor(private store: Store<ModuleState>, private route: ActivatedRoute) {
    this.jobs$ = store.pipe(map(state => state.jobs.jobs));
  }

  ngOnInit() {
    this.route.params.subscribe(({taskId}) => this.store.dispatch(new actions.FetchJobs(taskId)));
  }

  startJob() {
    this.route.params.subscribe(({taskId}) => this.store.dispatch(new actions.StartJob(taskId)));
  }

}
