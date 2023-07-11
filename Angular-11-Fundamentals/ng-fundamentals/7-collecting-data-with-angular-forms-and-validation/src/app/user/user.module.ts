import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ProfileReactiveFormComponent } from './profile-reactive-form/profile-reactive-form.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
    ProfileReactiveFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [
  ]
})
export class UserModule { }
