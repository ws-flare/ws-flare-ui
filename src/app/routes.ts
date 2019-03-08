import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './landing/landing.module#LandingModule'
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
