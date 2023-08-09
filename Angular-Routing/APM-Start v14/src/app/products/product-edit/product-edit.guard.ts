import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
// note CanDeactivate requies a generic parameter
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(
    // component must match the generic parameter
    component: ProductEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (component.isDirty)
    {
      const productName = component.product.productName || 'New Product';
      return confirm(`Naviate away and lose all changes to ${productName}?`);
    }
    return true;
  }

}
