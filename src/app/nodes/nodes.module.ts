import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NodesComponent } from './nodes.component';
import { RouterModule, Routes } from '@angular/router';
import { NodesListComponent } from './nodes-list/nodes-list.component';
import * as Highcharts from 'highcharts';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducer } from './nodes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NodesEffects } from './nodes.effects';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CfAppSummaryComponent } from './cf-app-summary/cf-app-summary.component';
import * as theme from 'highcharts/themes/dark-unica';
import exporter from 'highcharts/modules/exporting';

/**
 * Define browser routes for this module
 */
const routes: Routes = [
  {
    path: '',
    component: NodesComponent
  },
];

/**
 * Define the nodes module and its dependencies
 */
@NgModule({
  declarations: [NodesComponent, NodesListComponent, SummaryCardComponent, CfAppSummaryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('nodes', reducer),
    EffectsModule.forFeature([NodesEffects]),
    HighchartsChartModule,

    // Material
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class NodesModule {

  constructor(@Inject(PLATFORM_ID) platformId) {
    if (isPlatformBrowser(platformId)) {
      theme(Highcharts);
      exporter(Highcharts);
    }
  }

}
