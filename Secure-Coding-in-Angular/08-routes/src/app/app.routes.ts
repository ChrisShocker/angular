import { Routes } from '@angular/router';
import {
  isAuthenticatedCanActivateFn,
  roleIsAdminFn,
} from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  // protected route using the canActivate guard to check if the user is logged in
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [isAuthenticatedCanActivateFn],
  },
  // protected route using the canMatch guard to prevent children routes from loading if the user is not logged in
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((m) => m.AdminComponent),
    canMatch: [roleIsAdminFn],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
