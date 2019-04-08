import { async } from '@angular/core/testing';

import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { SidenavService } from './sidenav.service';
import { Project } from '../projects/Project.model';

jest.mock('apollo-angular');

describe('SidenavService', () => {

  it('should get data for sidenav', async(() => {
    Apollo.prototype.query = jest.fn().mockImplementationOnce(() => of({projects: [{}, {}, {}] as Project[]}));

    const service = new SidenavService(new Apollo(null, null));

    service.getData().subscribe(response => {
      expect(response).toEqual({projects: [{}, {}, {}]});
    });
  }));
});
