import { Component, Input, OnInit } from '@angular/core';
import { Usage } from '../usage.model';
import * as Highcharts from 'highcharts';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cf-app-summary',
  templateUrl: './cf-app-summary.component.html',
  styleUrls: ['./cf-app-summary.component.scss']
})
export class CfAppSummaryComponent implements OnInit {

  @Input() usages: Usage[];

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    series: []
  };
  chartCallback = this.callback.bind(this);

  private chartObject$: Observable<Highcharts.Chart>;
  private chartObjectSubject: BehaviorSubject<Highcharts.Chart | null>;

  ngOnInit() {
    this.chartObjectSubject = new BehaviorSubject(null);
    this.chartObject$ = this.chartObjectSubject.asObservable().pipe(filter(chartObject => !!chartObject));

    this.chartObject$.subscribe(chart => {

      chart.title.update({text: `${this.usages[0].name} memory usage`});

      chart.addSeries({
        type: 'line',
        name: 'memory',
        data: this.usages.map(usage => usage.mem)
      });
    });
  }

  private callback(chart: Highcharts.Chart) {
    this.chartObjectSubject.next(chart);
  }

}
