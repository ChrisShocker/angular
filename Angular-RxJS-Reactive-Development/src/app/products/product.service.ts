import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';

import { Product } from './product';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private suppliersUrl = 'api/suppliers';
  // create variable to hold selected product
  private productSelectedSubject = new BehaviorSubject<number>(0);
  // expose productSelected behaviour subject
  productSelectedAction$ = this.productSelectedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private productCategoryService: ProductCategoryService
  ) {}

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

  // RxJS combineLatest example
  productWithCategories$ = combineLatest([
    this.products$,
    this.productCategoryService.productCategories$,
  ]).pipe(
    map(([products, categories]) =>
      products.map(
        (product) =>
          ({
            ...product,
            price: product.price ? product.price * 1.5 : 0,
            category: categories.find((c) => product.categoryId === c.id)?.name,
            searchKey: [product.productName],
          } as Product)
      )
    )
  );

  // first observable emits array of products
  // second emits the selectedProductId
  selectedProduct$ = combineLatest([
    this.productWithCategories$,
    this.productSelectedAction$,
  ]).pipe(
    map(([products, selectedProductId]) =>
      products.find((product) => product.id === selectedProductId)
    ),
    tap((product) => console.log('selectedProduct', product))
  );

  // setter/helper function to update behaviourSubject
  // in service when user chooses a different product
  productSelectionChange(selectedProductId: number) {
    this.productSelectedSubject.next(selectedProductId);
  }

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
