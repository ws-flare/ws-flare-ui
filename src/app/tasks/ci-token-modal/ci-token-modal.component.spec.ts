import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiTokenModalComponent } from './ci-token-modal.component';

describe('CiTokenModalComponent', () => {
  let component: CiTokenModalComponent;
  let fixture: ComponentFixture<CiTokenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiTokenModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiTokenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
