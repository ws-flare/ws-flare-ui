import {async} from '@angular/core/testing';

import {NodesService} from './nodes.service';
import {Apollo} from 'apollo-angular';
import {of} from 'rxjs';
import {Node} from './node.model';

jest.mock('apollo-angular');

describe('NodesService', () => {

  it('should get data for nodes page', async(() => {
    Apollo.prototype.watchQuery = jest.fn().mockImplementationOnce(() => ({valueChanges: of({job: {nodes: [{}, {}, {}] as Node[]}})}));

    const service = new NodesService(new Apollo(null, null));

    service.getData('abc123').valueChanges.subscribe(response => {
      expect(response).toEqual({job: {nodes: [{}, {}, {}] as Node[]}});
    });
  }));
});
