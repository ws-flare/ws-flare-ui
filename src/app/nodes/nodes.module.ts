import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesComponent } from './nodes.component';
import { RouterModule, Routes } from '@angular/router';
import { NodesListComponent } from './nodes-list/nodes-list.component';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducer } from './nodes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NodesEffects } from './nodes.effects';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CfAppSummaryComponent } from './cf-app-summary/cf-app-summary.component';

const routes: Routes = [
  {
    path: '',
    component: NodesComponent
  },
];

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
    MatCardModule
  ]
})
export class NodesModule {
}
