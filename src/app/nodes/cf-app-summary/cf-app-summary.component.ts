import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppInstance } from '../nodes.state';

@Component({
  selector: 'app-cf-app-summary',
  templateUrl: './cf-app-summary.component.html',
  styleUrls: ['./cf-app-summary.component.scss']
})
export class CfAppSummaryComponent implements OnInit {

  @Input() instances: AppInstance;

  Highcharts = Highcharts;
  memoryChartOptions: Highcharts.Options = {
    chart: {
      zoomType: 'x'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.0f} MB</b>'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Seconds'
      }
    },
    yAxis: {
      title: {
        text: 'MB'
      }
    },
    series: []
  };
  cpuChartOptions: Highcharts.Options = {
    chart: {
      zoomType: 'x'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.0f} %</b>'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Seconds'
      }
    },
    yAxis: {
      title: {
        text: 'Percent Used'
      },
      min: 0,
      max: 100
    },
    series: []
  };
  memoryChartCallback = this.memoryCallback.bind(this);
  cpuChartCallback = this.cpuCallback.bind(this);

  private memoryChartObject$: Observable<Highcharts.Chart>;
  private cpuChartObject$: Observable<Highcharts.Chart>;
  private memoryChartObjectSubject: BehaviorSubject<Highcharts.Chart | null>;
  private cpuChartObjectSubject: BehaviorSubject<Highcharts.Chart | null>;

  ngOnInit() {
    this.memoryChartObjectSubject = new BehaviorSubject(null);
    this.cpuChartObjectSubject = new BehaviorSubject(null);
    this.memoryChartObject$ = this.memoryChartObjectSubject.asObservable().pipe(filter(chartObject => !!chartObject));
    this.cpuChartObject$ = this.cpuChartObjectSubject.asObservable().pipe(filter(chartObject => !!chartObject));

    // Memory Chart
    this.memoryChartObject$.subscribe(chart => {

      chart.title.update({text: `Memory`});

      Object.keys(this.instances).forEach(key => {
        chart.addSeries({
          type: 'line',
          name: `Instance ${key}`,
          data: this.instances[key].map(usage => usage.mem / Math.pow(1024, 2))
        });
      });
    });

    // CPU Chart
    this.cpuChartObject$.subscribe(chart => {

      chart.title.update({text: `CPU`});

      Object.keys(this.instances).forEach(key => {
        chart.addSeries({
          type: 'line',
          name: `Instance ${key}`,
          data: this.instances[key].map(usage => usage.cpu * 100)
        });
      });
    });
  }

  private memoryCallback(chart: Highcharts.Chart) {
    this.memoryChartObjectSubject.next(chart);
  }

  private cpuCallback(chart: Highcharts.Chart) {
    this.cpuChartObjectSubject.next(chart);
  }

}
