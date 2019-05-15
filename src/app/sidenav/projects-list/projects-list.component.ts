import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../projects/Project.model';

/**
 * Component for displaying a list of projects
 */
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  // Takes a list of projects as an input
  @Input() projects: Project[];

  constructor() {
  }

  ngOnInit() {
  }

}
