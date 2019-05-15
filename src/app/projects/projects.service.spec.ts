import { async } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { Project } from './Project.model';

jest.mock('apollo-angular');

/**
 * Tests for the projects service
 */
describe('ProjectsService', () => {

  it('should get a list of projects', async(() => {
    Apollo.prototype.query = jest.fn().mockImplementationOnce(() => of([{}, {}, {}] as Project[]));

    const service = new ProjectsService(new Apollo(null, null));

    service.getProjects().subscribe(response => {
      expect(response).toEqual([{}, {}, {}] as Project[]);
    });
  }));

  it('should create a project', () => {
    Apollo.prototype.mutate = jest.fn().mockImplementationOnce(() => of({id: 'abc123', name: 'project1'}));

    const service = new ProjectsService(new Apollo(null, null));

    service.createProject('project1').subscribe(response => {
      expect(response).toEqual({id: 'abc123', name: 'project1'});
    });
  });
});
