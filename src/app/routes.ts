import { Routes } from '@angular/router';
import { IsLoggedInGuard } from './core/is-logged-in.guard';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './landing/landing.module#LandingModule'
  },
  {
    path: 'projects',
    loadChildren: './projects/projects.module#ProjectsModule',
    canActivate: [IsLoggedInGuard]
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
