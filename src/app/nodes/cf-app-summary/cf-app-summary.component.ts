import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {AppInstance} from '../nodes.state';

@Component({
  selector: 'app-cf-app-summary',
  templateUrl: './cf-app-summary.component.html',
  styleUrls: ['./cf-app-summary.component.scss']
})
export class CfAppSummaryComponent implements OnInit {

  @Input() instances: AppInstance;

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

      chart.title.update({text: `Memory`});

      Object.keys(this.instances).forEach(key => {
        chart.addSeries({
          type: 'line',
          name: `Instance ${key}`,
          data: this.instances[key].map(usage => usage.mem / Math.pow(1024, 2))
        });
      });
    });
  }

  private callback(chart: Highcharts.Chart) {
    this.chartObjectSubject.next(chart);
  }

}
