import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesComponent } from './nodes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import * as actions from './nodes.actions';

jest.mock('@ngrx/store');

describe('NodesComponent', () => {
  let component: NodesComponent;
  let fixture: ComponentFixture<NodesComponent>;
  let element;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NodesComponent],
      providers: [
        {
          provide: Store,
          useValue: new Store(of({
            nodes: {
              usages: {
                abc1: [],
                abc2: [],
                abc3: [],
              }
            }
          }), null, null)
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({jobId: 'abc123'})
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should have a list of nodes', () => {
    expect(element.querySelector('app-nodes-list')).not.toBeNull();
  });

  it('should have a summary of the results', () => {
    expect(element.querySelector('app-summary-card')).not.toBeNull();
  });

  it('should dispatch an action to fetch data', () => {
    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.FetchData('abc123'));
  });

  it('should show app memory usage', () => {
    expect(element.querySelectorAll('app-cf-app-summary').length).toBe(2);
  });
});
