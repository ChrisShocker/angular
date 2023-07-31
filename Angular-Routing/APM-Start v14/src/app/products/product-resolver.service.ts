import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";

import { Product } from "./product";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product>{
  constructor(private productService: ProductService) { }

  // resolver doesn't have to be subscribed to and won't
  // return until the data is fetched and subscription is complete
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product>
  {
    const id = Number(route.paramMap.get('id'));
    return this.productService.getProduct(id);
  }
}