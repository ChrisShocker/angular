import { ComponentRef, Injectable } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { ComponentStore } from '@ngrx/component-store';
import { exhaustMap, tap } from 'rxjs';

// Define the shape of the state for the component/products store
interface ProductState {
  products: Product[];
}

@Injectable()
export class ProductsStore extends ComponentStore<ProductState> {
  products$ = this.select((state) => state.products);

  constructor(private productsService: ProductsService) {
    // call component store base class with initial state
    super({ products: [] });
  }

  addProducts = this.updater((state, products: Product[]) => ({
    ...this.state,
    products,
  }));

  getProducts = this.effect((trigger$) =>
    trigger$.pipe(
      exhaustMap(() =>
        this.productsService.getAll().pipe(tap({ next: this.addProducts }))
      )
    )
  );
}
