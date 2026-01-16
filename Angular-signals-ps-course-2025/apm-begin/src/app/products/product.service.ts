import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  productsResource = httpResource<Product[]>(() => this.productsUrl, {
    defaultValue: [],
  });

  selectedProduct = signal<Product | undefined>(undefined);

  // this resource is created and called now when the function is called
  createProducts() {
    return httpResource<Product[]>(() => this.productsUrl, {
      defaultValue: [],
    });
  }
}
