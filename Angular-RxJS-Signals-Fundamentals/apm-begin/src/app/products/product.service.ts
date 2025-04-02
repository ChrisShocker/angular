import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, take, tap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';

  // Angular 14+ inject dependency injection
  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);

  /**
   * // constructor based depedency injection
   *  constructor(private http: HttpClient){}
   */

  getProducts$(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productsUrl)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  getProductById$(id: number): Observable<Product> {
    const url = `${this.productsUrl + '/' + id}`;
    return this.http
      .get<Product>(url)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  private handleErrors(error: HttpErrorResponse) {
    const formattedError = this.errorService.formatError(error);
    // we can use the throwError which returns an observable, no more EMPTY
    return throwError(() => formattedError);
  }
}
