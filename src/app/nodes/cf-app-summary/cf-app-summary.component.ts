import {Component, Input, OnInit} from '@angular/core';
import {Usage} from '../usage.model';
import * as Highcharts from 'highcharts';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import * as prettyBytes from 'pretty-bytes';

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
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.0f} MB</b>'
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
        data: this.usages.map(usage => usage.mem / Math.pow(1024,2))
      });
    });
  }

  private callback(chart: Highcharts.Chart) {
    this.chartObjectSubject.next(chart);
  }

}
