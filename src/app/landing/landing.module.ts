import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from '../user/user.module';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
];

@NgModule({
  declarations: [LandingComponent, SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UserModule
  ]
})
export class LandingModule {
}
