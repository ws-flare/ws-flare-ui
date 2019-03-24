import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardComponent } from './summary-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

jest.mock('@ngrx/store');

describe('SummaryCardComponent', () => {
  let component: SummaryCardComponent;
  let fixture: ComponentFixture<SummaryCardComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SummaryCardComponent],
      providers: [
        {
          provide: Store,
          useValue: new Store(null, null, null)
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryCardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have a card', () => {
    expect(element.querySelector('mat-card')).not.toBeNull();
  });

  it('should have a chart', () => {
    expect(element.querySelector('highcharts-chart')).not.toBeNull();
  });
});
