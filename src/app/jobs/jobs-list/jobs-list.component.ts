import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../job.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  @Input() jobs: Job[];

  constructor() {
  }

  ngOnInit() {
  }

}
