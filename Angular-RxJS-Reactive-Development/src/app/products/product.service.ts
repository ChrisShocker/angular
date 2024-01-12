import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private suppliersUrl = 'api/suppliers';

  // declarative observable
  // to map an array, map the array object then map the items in that object
  // note the map will transform the element types, we must transform them back
  products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    map((products) =>
      products.map(
        (product) =>
          ({
            // use spread operator to get existing product params
            ...product,
            // transform the params we want with a property :
            price: product.price ? product.price * 1.5 : 0,
            // set the searchKey nested array first element to the name of the product
            searchKey: [product.productName],
            // ensure proper type is returned using the 'as Product'
          } as Product)
      )
    ),

    tap((data) => console.log('Products; ', JSON.stringify(data))),
    catchError(this.handleError)
  );

  constructor(private http: HttpClient) {}

  private fakeProduct(): Product {
    return {
      id: 42,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      // category: 'Toolbox',
      quantityInStock: 30,
    };
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
