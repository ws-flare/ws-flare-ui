import { tasksState, TasksState } from './tasks.state';
import * as actions from './tasks.actions';
import { reducer } from './tasks.reducer';
import { Task } from './task.model';

describe('Tasks reducer', () => {

  it('should return same state if action is not recognized', () => {
    const state: TasksState = {...tasksState};
    const action = {type: 'UNKNOWN'} as any;

    expect(reducer(state, action)).toEqual({...state});
  });

  it('should fetch tasks', () => {
    const state: TasksState = {...tasksState, isFetchingTasks: false};
    const action = new actions.FetchTasks('abc123');

    expect(reducer(state, action)).toEqual({...state, isFetchingTasks: true});
  });

  it('should handle successful response to fetching tasks', () => {
    const state: TasksState = {...tasksState, isFetchingTasks: true, tasks: []};
    const action = new actions.FetchTasksOk([{}, {}, {}] as Task[]);

    expect(reducer(state, action)).toEqual({...state, isFetchingTasks: false, tasks: [{}, {}, {}]});
  });

  it('should handle failed response to fetching tasks', () => {
    const state: TasksState = {...tasksState, isFetchingTasks: true};
    const action = new actions.FetchTaskFail();

    expect(reducer(state, action)).toEqual({...state, isFetchingTasks: false});
  });

  it('should create a new task', () => {
    const state: TasksState = {...tasksState, isCreatingTask: false};
    const action = new actions.CreateTask({name: 'task1'} as Task);

    expect(reducer(state, action)).toEqual({...state, isCreatingTask: true});
  });

  it('should handle successful response to creating a task', () => {
    const state: TasksState = {...tasksState, isCreatingTask: true, tasks: [{id: 'abc1'}] as Task[]};
    const action = new actions.CreateTaskOk({id: 'abc2'} as Task);

    expect(reducer(state, action)).toEqual({...state, isCreatingTask: false, tasks: [{id: 'abc2'}, {id: 'abc1'}]});
  });

  it('should handle failed response to creating a task', () => {
    const state: TasksState = {...tasksState, isCreatingTask: true};
    const action = new actions.CreateTaskFail();

    expect(reducer(state, action)).toEqual({...state, isCreatingTask: false});
  });

  it('should generate ci token', () => {
    const state: TasksState = {...tasksState, ciToken: null};
    const action = new actions.GenerateCiTokenOk({token: 'abc123'});

    expect(reducer(state, action)).toEqual({...state, ciToken: {token: 'abc123'}});
  });
});
