import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { MatIconModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from './sidenav.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SidenavEffects } from './sidenav.effects';

@NgModule({
  declarations: [SidenavComponent, ProjectsListComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('sidenav', reducer),
    EffectsModule.forFeature([SidenavEffects]),

    // Material
    MatListModule,
    MatIconModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule {
}
