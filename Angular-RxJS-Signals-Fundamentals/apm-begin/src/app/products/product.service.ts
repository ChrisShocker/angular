import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  catchError,
  EMPTY,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

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

  /**
   * // constructor based depedency injection
   *  constructor(private http: HttpClient){}
   */

  readonly products$ = this.http
    .get<Product[]>(this.productsUrl)
    .pipe(catchError((error) => this.handleErrors(error)));

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

  // getProducts$(): Observable<Product[]> {
  //   return this.http
  //     .get<Product[]>(this.productsUrl)
  //     .pipe(catchError((error) => this.handleErrors(error)));
  // }

  private handleErrors(error: HttpErrorResponse) {
    const formattedError = this.errorService.formatError(error);
    // we can use the throwError which returns an observable, no more EMPTY
    return throwError(() => formattedError);
  }
}
