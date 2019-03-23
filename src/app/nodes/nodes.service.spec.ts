import { async } from '@angular/core/testing';

import { NodesService } from './nodes.service';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { Node } from './node.model';

jest.mock('apollo-angular');

describe('NodesService', () => {

  it('should get get data for nodes page', async(() => {
    Apollo.prototype.query = jest.fn().mockImplementationOnce(() => of({nodes: [{}, {}, {}] as Node[]}));

    const service = new NodesService(new Apollo(null, null));

    service.getData('abc123').subscribe(response => {
      expect(response).toEqual({nodes: [{}, {}, {}] as Node[]});
    });
  }));
});
