import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesComponent } from './nodes.component';
import { RouterModule, Routes } from '@angular/router';
import { NodesListComponent } from './nodes-list/nodes-list.component';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducer } from './nodes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NodesEffects } from './nodes.effects';

const routes: Routes = [
  {
    path: '',
    component: NodesComponent
  },
];

@NgModule({
  declarations: [NodesComponent, NodesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('nodes', reducer),
    EffectsModule.forFeature([NodesEffects]),

    // Material
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class NodesModule {
}
