import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Product, Result } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';

  // Angular 14+ inject dependency injection
  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);

  private productsResult$ = this.http.get<Product[]>(this.productsUrl).pipe(
    // map the result to the new result type and catch the error
    map((p) => ({ data: p, error: undefined } as Result<Product[]>)),
    tap((p) => {
      console.log(JSON.stringify(p));
    }),
    // shareReplay location matters, operators above are executed before cache and not executed on next sub
    shareReplay(1),
    // operators below are executed on every subscription
    catchError((error) =>
      of({ data: [], error: this.errorService.formatError(error) } as Result<
        Product[]
      >)
    )
  );

  private productsResult = toSignal(this.productsResult$, {
    initialValue: { data: [] } as Result<Product[]>,
  });

  // add computed signals for products and error messages that can be subscribed to
  products = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult().error);

  /* example signla error handling (not so clean): 
   * catch the error in the signal and handle it with a try catch block
  products = computed(() => {
    try {
      // open the box ()!
      return toSignal(this.products$, { initialValue: [] as Product[] })();
    } catch (error) {
      return [] as Product[];
    }
  });
  */

  private productSelectedSubject = new BehaviorSubject<number | undefined>(
    undefined
  );
  readonly productSelected$ = this.productSelectedSubject.asObservable();
  selectedProductId = signal<number | undefined>(undefined);

  productSelected(selectedProductId: number) {
    // use signal instead
    this.selectedProductId.set(selectedProductId);
    this.productSelectedSubject.next(selectedProductId);
  }

  readonly product$ = this.productSelected$.pipe(
    // filter out null and undefined values
    filter(Boolean),
    switchMap((id) => {
      const productUrl = this.productsUrl + '/' + id;
      return this.http.get<Product>(productUrl).pipe(
        switchMap((product) => this.getProductWithReviews(product)),
        catchError((err) => this.handleErrors(err))
      );
    })
  );

  // product$ = combineLatest([this.productSelected$, this.products$]).pipe(
  //   map(([selectedProductId, products]) =>
  //     products.find((product) => product.id === selectedProductId)
  //   ),
  //   filter(Boolean),
  //   switchMap((product) => this.getProductWithReviews(product)),
  //   catchError((err) => this.handleErrors(err))
  // );

  // use a switchMap to cancel all prior subscriptions
  getProductById$(id: number): Observable<Product> {
    const productUrl = this.productsUrl + '/' + id;
    return this.http.get<Product>(productUrl).pipe(
      switchMap((product) => this.getProductWithReviews(product)),
      catchError((err) => this.handleErrors(err))
    );
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http
        .get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(
          map((reviews) => {
            product.reviews = reviews;
            return product;
          })
        );
    } else return of(product);
  }

  private handleErrors(error: HttpErrorResponse) {
    const formattedError = this.errorService.formatError(error);
    // we can use the throwError which returns an observable, no more EMPTY
    return throwError(() => formattedError);
  }
}
