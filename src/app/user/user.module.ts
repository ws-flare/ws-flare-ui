import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './user.reducer';

/**
 * Defines the user module and its dependencies
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('user', reducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule {
}
