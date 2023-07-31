import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

let routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent],
})
export class UserModule {}
