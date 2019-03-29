import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfAppSummaryComponent } from './cf-app-summary.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CfAppSummaryComponent', () => {
  let component: CfAppSummaryComponent;
  let fixture: ComponentFixture<CfAppSummaryComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CfAppSummaryComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfAppSummaryComponent);
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
