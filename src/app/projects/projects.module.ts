import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { MatButtonModule, MatDialogModule, MatInputModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducer } from './projects.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectsEffects } from './projects.effects';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Browser routes for this module
 */
const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
];

/**
 * Defines the projects module and its dependencies
 */
@NgModule({
  declarations: [ProjectsComponent, ProjectsListComponent, CreateProjectModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('projects', reducer),
    EffectsModule.forFeature([ProjectsEffects]),

    // Material
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  entryComponents: [
    CreateProjectModalComponent
  ]
})
export class ProjectsModule {
}
