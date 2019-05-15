import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from '../user/user.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

/**
 * Routes for landing module
 */
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  },
];

/**
 * Defines landing module and its dependencies
 */
@NgModule({
  declarations: [
    LandingComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UserModule,

    // Material
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class LandingModule {
}
