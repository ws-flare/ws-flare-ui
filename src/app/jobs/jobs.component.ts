import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.state';
import { Observable } from 'rxjs';
import { Job } from './job.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as actions from './jobs.actions';

/**
 * Jobs container component for displaying list of jobs
 */
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

  /**
   * Read task id from the browser route then dispatch an action to fetch jobs
   */
  ngOnInit() {
    this.route.params.subscribe(({taskId}) => this.store.dispatch(new actions.FetchJobs(taskId)));
  }

  /**
   * Read task id from the browser then dispatch an action to start a job
   */
  startJob() {
    this.route.params.subscribe(({taskId}) => this.store.dispatch(new actions.StartJob(taskId)));
  }

}
