import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad
{

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route): boolean
  {
    if(route.path){
      return this.checkLoggedIn(route.path);
    }
    else{
      return false;
    }
  }

  canActivate(
    // contains info for the current route
    route: ActivatedRouteSnapshot,
    // provides access to router state
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.checkLoggedIn(state.url);
  }

  // use authService to check user login status
  checkLoggedIn(url: string): boolean
  {
    if (this.authService.isLoggedIn)
    {
      return true;
    }
    else
    {
      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;
    }
  }

}
