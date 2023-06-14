import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {
  //need to check the URL
  //navigation requires the router, create constructor to inject it
  constructor(private router: Router) { }

  canActivate(
    //provides current router information
    route: ActivatedRouteSnapshot,
    //provides current router state information
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //read parameter from route
    const id = Number(route.paramMap.get("id"));

    //send alert to user, could also route to an error page
    if (isNaN(id) || id < 1) {
      alert("Invalid product id");
      this.router.navigate(['/products']);

      //return false to stop router from activating product detail route
      return false;
    }

    return true;

  }

}
