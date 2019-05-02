import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Store } from '@ngrx/store';
import * as userActions from '../../user/user.actions';
import { NO_ERRORS_SCHEMA } from '@angular/core';

jest.mock('@ngrx/store');

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [{provide: Store, useValue: new Store(null, null, null)}]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have a username field', () => {
    expect(element.querySelector('input#username')).not.toBeNull();
  });

  it('should have a password field', () => {
    expect(element.querySelector('input#password')).not.toBeNull();
  });

  it('should have a submit login button', () => {
    expect(element.querySelector('button')).not.toBeNull();
    expect(element.querySelector('button').textContent).toContain('Login');
  });

  describe('actions', () => {

    it('should update username', () => {
      const username = element.querySelector('input#username');

      username.value = 'testUser';
      username.dispatchEvent(new Event('keyup'));

      expect(Store.prototype.dispatch).toHaveBeenCalledWith(new userActions.UpdateUsername('testUser'));
    });

    it('should update password', () => {
      const password = element.querySelector('input#password');

      password.value = 'testPass';
      password.dispatchEvent(new Event('keyup'));

      expect(Store.prototype.dispatch).toHaveBeenCalledWith(new userActions.UpdatePassword('testPass'));
    });

    it('should login', () => {
      const username = element.querySelector('input#username');
      const password = element.querySelector('input#password');

      username.value = 'testUser';
      username.dispatchEvent(new Event('input'));

      password.value = 'testPass';
      password.dispatchEvent(new Event('input'));

      element.querySelector('button').click();

      expect(Store.prototype.dispatch).toHaveBeenCalledWith(new userActions.Login());
    });
  });
});
