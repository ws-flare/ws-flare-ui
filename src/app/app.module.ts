import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {IsLoggedInGuard} from './core/is-logged-in.guard';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {MatDialogModule, MatSidenavModule} from '@angular/material';
import {NavModule} from './nav/nav.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(appRoutes),
    EffectsModule.forRoot([AppEffects]),

    // Material
    MatDialogModule,
    MatSidenavModule,

    // Features
    NavModule
  ],
  providers: [
    IsLoggedInGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
