import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';

  // Angular 14+ inject dependency injection
  private http = inject(HttpClient);

  /**
   * // constructor based depedency injection
   *  constructor(private http: HttpClient){}
   */

  getProducts$(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductById$(id: number): Observable<Product> {
    const url = `${this.productsUrl + '/' + id}`;
    return this.http.get<Product>(url);
  }
}
