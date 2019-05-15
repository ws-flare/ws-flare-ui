import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material';
import { NavComponent } from './nav.component';

/**
 * Defines the nav module and its dependencies
 */
@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,

    // Material
    MatToolbarModule
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule {
}
