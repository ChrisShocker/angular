import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EMPTY, Observable, catchError, filter, map } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];
  selectedCategoryId = 1;

  // declaritive observable that uses async and has error handeling
  productWithCategories$ = this.productService.productWithCategories$.pipe(
    catchError((err: string) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // example filter with dereferenced array
  productsSimpleFilter$ = this.productService.productWithCategories$.pipe(
    map((products) =>
      products.filter((product) =>
        this.selectedCategoryId
          ? product.categoryId === this.selectedCategoryId
          : true
      )
    )
  );

  constructor(private productService: ProductService) {}

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
