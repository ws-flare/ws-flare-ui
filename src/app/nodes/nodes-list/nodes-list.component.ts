import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../node.model';

/**
 * Component for displaying a list of nodes in the user interface
 */
@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.scss']
})
export class NodesListComponent implements OnInit {

  // Takes a list of nodes
  @Input() nodes: Node[];

  constructor() {
  }

  ngOnInit() {
  }

}
