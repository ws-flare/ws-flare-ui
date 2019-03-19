import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './tasks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './tasks.effects';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent
  },
];

@NgModule({
  declarations: [TasksComponent, TasksListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('tasks', reducer),
    EffectsModule.forFeature([TasksEffects]),

    // Material
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TasksModule {
}
