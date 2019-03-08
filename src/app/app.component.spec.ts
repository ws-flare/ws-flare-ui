import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    });
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    element = fixture.nativeElement;
  });

  it('should have a router outlet', () => {
    expect(element.querySelector('router-outlet')).not.toBeNull();
  });

});
