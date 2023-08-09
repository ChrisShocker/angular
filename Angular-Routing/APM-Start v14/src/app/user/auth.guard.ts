import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    // contains info for the current route
    route: ActivatedRouteSnapshot,
    // provides access to router state
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.checkLoggedIn();
  }

  // use authService to check user login status
  checkLoggedIn(): boolean
  {
    if (this.authService.isLoggedIn)
    {
      return true;
    }
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
