import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './tasks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './tasks.effects';
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';
import { MonacoEditorModule } from 'ngx-monaco';
import { CiTokenModalComponent } from './ci-token-modal/ci-token-modal.component';

/**
 * Defines browser routes for this module
 */
const routes: Routes = [
  {
    path: '',
    component: TasksComponent
  }
];

/**
 * Define the tasks module and its dependencies
 */
@NgModule({
  declarations: [TasksComponent, TasksListComponent, CreateTaskModalComponent, CiTokenModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('tasks', reducer),
    EffectsModule.forFeature([TasksEffects]),
    MonacoEditorModule.forRoot(),

    // Material
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule
  ],
  entryComponents: [
    CreateTaskModalComponent,
    CiTokenModalComponent
  ]
})
export class TasksModule {
}
