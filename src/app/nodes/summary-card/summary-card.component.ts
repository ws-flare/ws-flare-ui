import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Highcharts from 'highcharts';
import { filter, map } from 'rxjs/operators';
import { ModuleState } from '../module.state';
import { Node } from '../node.model';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {

  nodes$: Observable<Node[]>;
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    colors: ['#4BB543', '#cc0000', '#FFFF33'],
    title: {
      text: 'Connections Summary'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}',
          style: {
            color: ''
          }
        }
      }
    },
    series: []
  };
  chartCallback = this.callback.bind(this);

  private chartObject$: Observable<Highcharts.Chart>;
  private chartObjectSubject: BehaviorSubject<Highcharts.Chart | null>;

  constructor(private store: Store<ModuleState>) {
  }

  ngOnInit() {
    this.nodes$ = this.store.pipe(map(state => state.nodes.nodes));

    this.chartObjectSubject = new BehaviorSubject(null);
    this.chartObject$ = this.chartObjectSubject.asObservable().pipe(filter(chartObject => !!chartObject));

    this.chartObject$.subscribe(chart => {
      this.nodes$.subscribe(nodes => {
        let totalSuccess = 0;
        let totalFailed = 0;
        let totalDropped = 0;

        nodes.forEach(node => {
          totalSuccess += node.totalSuccessfulConnections;
          totalFailed += node.totalFailedConnections;
          totalDropped += node.totalDroppedConnections;
        });

        for (let i = chart.series.length - 1; i > -1; i--) {
          chart.series[i].remove();
        }

        chart.addSeries({
          type: 'pie',
          name: 'Connections',
          data: [
            {
              name: 'Success',
              y: totalSuccess
            }, {
              name: 'Failed',
              y: totalFailed
            }, {
              name: 'Dropped',
              y: totalDropped
            }
          ]
        });
      });
    });
  }

  private callback(chart: Highcharts.Chart) {
    this.chartObjectSubject.next(chart);
  }

}
