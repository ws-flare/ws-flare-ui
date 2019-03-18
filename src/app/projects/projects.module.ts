import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { MatListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducer } from './projects.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectsEffects } from './projects.effects';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
];

@NgModule({
  declarations: [ProjectsComponent, ProjectsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('projects', reducer),
    EffectsModule.forFeature([ProjectsEffects]),

    // Material
    MatListModule
  ]
})
export class ProjectsModule {
}
