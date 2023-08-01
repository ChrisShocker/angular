import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { catchError, map, Observable, of } from "rxjs";

import { ProductResolved } from "./product";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved>{
  constructor(private productService: ProductService) { }

  // resolver doesn't have to be subscribed to and won't
  // return until the data is fetched and subscription is complete
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved>
  {
    const id = route.paramMap.get('id');

    //catch id null
    if (!id)
    {
      const message = `Product is null: ${id}`;
      console.error(message);
      //cast object as an observable using 'of'
      return of({ product: null, error: message });
    }

    //catch error if id isn't a number
    if (isNaN(+id))
    {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      //cast object as an observable using 'of'
      return of({ product: null, error: message });
    }

    // return the product that matches id or return all other errors
    return this.productService.getProduct(+id)
      .pipe(
        map(product => ({ product: product })),
        catchError(error =>
        {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ product: null, error: message });
        })
      );
  }
}