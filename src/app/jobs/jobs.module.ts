import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { RouterModule, Routes } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducer } from './jobs.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JobsEffects } from './jobs.effects';
import { TimeAgoPipe } from 'time-ago-pipe';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent
  },
];

@NgModule({
  declarations: [JobsComponent, JobsListComponent, TimeAgoPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('jobs', reducer),
    EffectsModule.forFeature([JobsEffects]),

    // Material
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class JobsModule {
}
