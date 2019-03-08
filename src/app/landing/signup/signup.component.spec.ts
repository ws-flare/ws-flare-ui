import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignupComponent} from './signup.component';
import {Store} from '@ngrx/store';
import * as actions from '../../user/user.actions';

jest.mock('@ngrx/store');

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let element;
  let username;
  let email;
  let password;
  let submitButton;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [{provide: Store, useValue: new Store(null, null, null)}]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    username = element.querySelector('input#signup-username');
    email = element.querySelector('input#signup-email');
    password = element.querySelector('input#signup-password');
    submitButton = element.querySelector('button');

    fixture.detectChanges();
  });

  it('should have correct fields', () => {
    expect(username).not.toBeNull();
    expect(email).not.toBeNull();
    expect(password).not.toBeNull();
  });

  it('should have a submit button', () => {
    expect(submitButton.textContent).toEqual('Signup');
  });

  describe('actions', () => {

    it('should dispatch an action to update username', () => {
      username.value = 'testUser';
      username.dispatchEvent(new Event('keyup'));

      fixture.detectChanges();

      expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.UpdateSignupUsername('testUser'));
    });

    it('should dispatch an action to update email', () => {
      email.value = 'test@test.com';
      email.dispatchEvent(new Event('keyup'));

      fixture.detectChanges();

      expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.UpdateSignupEmail('test@test.com'));
    });

    it('should dispatch an action to update password', () => {
      password.value = 'newPass';
      password.dispatchEvent(new Event('keyup'));

      fixture.detectChanges();

      expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.UpdateSignupPassword('newPass'));
    });

    it('should dispatch an action to signup', () => {
      submitButton.click();

      expect(Store.prototype.dispatch).toHaveBeenCalledWith(new actions.Signup());
    });
  });
});
