import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { MatListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducer } from './projects.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectsEffects } from './projects.effects';

@NgModule({
  declarations: [ProjectsComponent, ProjectsListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('projects', reducer),
    EffectsModule.forFeature([ProjectsEffects]),

    // Material
    MatListModule
  ]
})
export class ProjectsModule {
}
