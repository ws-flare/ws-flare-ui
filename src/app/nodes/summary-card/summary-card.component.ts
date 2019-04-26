import {Component, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {BehaviorSubject, forkJoin, merge, Observable} from 'rxjs';
import * as Highcharts from 'highcharts';
import {filter, map} from 'rxjs/operators';
import {ModuleState} from '../module.state';
import {ConnectedSocketTick} from '../nodes.state';
import {Node} from '../node.model';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {

  totalSimulators$: Observable<number>;
  nodes$: Observable<Node[]>;
  sockets$: Observable<ConnectedSocketTick[]>;
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Websocket Connection Summary'
    },
    plotOptions: {
      series: {
        animation: false
      }
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Seconds'
      }
    },
    yAxis: {
      title: {
        text: 'Connections'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
    },
    series: []
  };
  chartCallback = this.callback.bind(this);

  private chartObject$: Observable<Highcharts.Chart>;
  private chartObjectSubject: BehaviorSubject<Highcharts.Chart | null>;

  constructor(private store: Store<ModuleState>) {
  }

  ngOnInit() {
    this.totalSimulators$ = this.store.pipe(select(state => state.nodes.totalSimulators));
    this.nodes$ = this.store.pipe(select(state => state.nodes.nodes));
    this.sockets$ = this.store.pipe(select(state => state.nodes.connectedSockets));

    this.chartObjectSubject = new BehaviorSubject(null);
    this.chartObject$ = this.chartObjectSubject.asObservable().pipe(filter(chartObject => !!chartObject));

    this.chartObject$.subscribe(chart => {
      this.totalSimulators$.subscribe(totalSimulators => {
        this.nodes$.subscribe(nodes => {
          let totalSuccess = 0;
          let totalFailed = 0;
          let totalDropped = 0;

          nodes.forEach(node => {
            totalSuccess += node.totalSuccessfulConnections;
            totalFailed += node.totalFailedConnections;
            totalDropped += node.totalDroppedConnections;
          });

          const totalUnconnected = totalSimulators - totalSuccess - totalFailed - totalDropped;

          for (let i = chart.series.length - 1; i > -1; i--) {
            if (chart.series[i].type === 'pie') {
              chart.series[i].remove();
            }
          }

          chart.addSeries({
            type: 'pie',
            name: 'Connections',
            center: [100, 80],
            size: 100,
            showInLegend: true,
            dataLabels: {
              enabled: false
            },
            data: [
              {
                name: 'Success',
                y: totalSuccess,
                color: '#A9FF96'
              }, {
                name: 'Failed',
                y: totalFailed,
                color: '#F45B5B'
              }, {
                name: 'Dropped',
                y: totalDropped,
                color: '#7F85E9'
              }, {
                name: 'Unconnected',
                y: totalUnconnected,
                color: '#5C5C61'
              }
            ]
          });
        });
      });

      this.sockets$.subscribe(sockets => {

        for (let i = chart.series.length - 1; i > -1; i--) {
          if (chart.series[i].type === 'line') {
            chart.series[i].remove();
          }
        }

        chart.xAxis[0].update({categories: sockets.map(socket => socket.tick.toString())}, true);

        chart.addSeries({
          type: 'line',
          name: `Connected`,
          color: '#F6A35C',
          data: sockets.map(socket => socket.connectedSocketCount.count)
        });

      });
    });
  }

  private callback(chart: Highcharts.Chart) {
    this.chartObjectSubject.next(chart);
  }

}
