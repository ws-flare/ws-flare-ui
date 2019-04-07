import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {BehaviorSubject, Observable} from 'rxjs';
import * as Highcharts from 'highcharts';
import {filter, map} from 'rxjs/operators';
import {ModuleState} from '../module.state';
import {ConnectedSocketTick} from '../nodes.state';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {

  sockets$: Observable<ConnectedSocketTick[]>;
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      zoomType: 'x'
    },
    xAxis: {
      categories: []
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
    this.sockets$ = this.store.pipe(map(state => state.nodes.connectedSockets));

    this.chartObjectSubject = new BehaviorSubject(null);
    this.chartObject$ = this.chartObjectSubject.asObservable().pipe(filter(chartObject => !!chartObject));

    this.chartObject$.subscribe(chart => {
      this.sockets$.subscribe(sockets => {

        for (let i = chart.series.length - 1; i > -1; i--) {
          chart.series[i].remove();
        }

        chart.xAxis[0].update({categories: sockets.map(socket => socket.tick.toString())}, true);

        chart.addSeries({
          type: 'line',
          name: `Successful Connections`,
          data: sockets.map(socket => socket.connectedSocketCount.count)
        });

      });
    });
  }

  private callback(chart: Highcharts.Chart) {
    this.chartObjectSubject.next(chart);
  }

}
