import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
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
