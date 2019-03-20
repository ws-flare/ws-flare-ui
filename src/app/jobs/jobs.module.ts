import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { RouterModule, Routes } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducer } from './jobs.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JobsEffects } from './jobs.effects';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent
  },
];

@NgModule({
  declarations: [JobsComponent, JobsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('jobs', reducer),
    EffectsModule.forFeature([JobsEffects]),

    // Material
    MatListModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class JobsModule {
}
