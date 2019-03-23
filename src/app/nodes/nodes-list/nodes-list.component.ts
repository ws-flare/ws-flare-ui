import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../node.model';

@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.scss']
})
export class NodesListComponent implements OnInit {

  @Input() nodes: Node[];

  constructor() {
  }

  ngOnInit() {
  }

}
