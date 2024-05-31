import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanMatchFn,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../auth.service';

// guard ensures the user is logged in and has the admin role before loading a aroute
export const roleIsAdminFn: CanMatchFn = (
  route: Route,
  segments: UrlSegment[],
  authService = inject(AuthService)
) => authService.isLoggedIn && authService.role === 'admin';

// canActivate checks for a boolean before loading a route
export const isAuthenticatedCanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authService = inject(AuthService)
) => authService.isLoggedIn;

// canMatch checks for a boolean before loading a route
export const isAuthenticatedCanMatchFn = (
  route: Route,
  segments: UrlSegment[],
  authService = inject(AuthService)
) => authService.isLoggedIn;
