import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiTokenModalComponent } from './ci-token-modal.component';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as appActions from '../../app.actions';
import { of } from 'rxjs';

jest.mock('@ngrx/store');

describe('CiTokenModalComponent', () => {

  const state = {
    tasks: {
      ciToken: {
        token: 'abc123'
      }
    }
  };

  let component: CiTokenModalComponent;
  let fixture: ComponentFixture<CiTokenModalComponent>;
  let element;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CiTokenModalComponent],
      providers: [
        {
          provide: Store,
          useValue: new Store(of(state), null, null)
        },
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiTokenModalComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have correct modal title', () => {
    expect(element.querySelector('h2').textContent).toContain('CI Token');
  });

  it('should have an OK button', () => {
    expect(element.querySelectorAll('button')[0].textContent).toContain('OK');
  });

  it('should close the modal when the user clicks OK', () => {
    element.querySelectorAll('button')[0].click();

    expect(Store.prototype.dispatch).toHaveBeenCalledWith(new appActions.CloseAllModals());
  });
});
