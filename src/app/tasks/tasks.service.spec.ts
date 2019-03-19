import { async } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { Task } from './task.model';

jest.mock('apollo-angular');

describe('TasksService', () => {

  it('should get a list of tasks', async(() => {
    Apollo.prototype.query = jest.fn().mockImplementationOnce(() => of([{}, {}, {}] as Task[]));

    const service = new TasksService(new Apollo(null, null));

    service.getTasks('abc123').subscribe(response => {
      expect(response).toEqual([{}, {}, {}] as Task[]);
    });
  }));

  it('should create a task', () => {
    Apollo.prototype.mutate = jest.fn().mockImplementationOnce(() => of({id: 'abc123', name: 'test123'}));

    const service = new TasksService(new Apollo(null, null));

    service.createTask({name: 'test123'} as Task).subscribe(response => {
      expect(response).toEqual({id: 'abc123', name: 'test123'});
    });
  });
});
