import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 1299.99 },
    { id: 2, name: 'Keyboard', price: 129.99 },
    { id: 3, name: 'Mouse', price: 49.99 }
  ];

  getProducts() {
    if (Math.random() < 0.3) {
      return throwError(() => new Error('Failed to load products')).pipe(delay(500));
    }

    return of(this.products).pipe(delay(500));
  }
}
