import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  EMPTY,
  Subject,
  catchError,
  combineLatest,
  map,
  startWith,
} from 'rxjs';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  // subject to hold the category, private to prevent emissions outside service
  private categorySelectedSubject = new Subject<number>();
  // expose the value of the subject for other components to subscribe to
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  // Note: combineLatest doesn't set an initial value, so until one is emitted the subscribers will be given nothing to display, a behaviour subject can be used instead of a subject to set a initila value or a pipe with 'startWith() on the observable'
  products$ = combineLatest([
    this.productService.productWithCategories$,
    this.categorySelectedAction$.pipe(startWith(0)),
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter((product) =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )
    ),
    catchError((error) => {
      this.errorMessage = error;
      return EMPTY;
    })
  );

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((error) => {
      console.log(error);
      this.errorMessage = error;
      return EMPTY;
    })
  );

  // declaritive observable that uses async and has error handeling
  productWithCategories$ = this.productService.productWithCategories$.pipe(
    catchError((err: string) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // example filter with dereferenced array
  // productsSimpleFilter$ = this.productService.productWithCategories$.pipe(
  //   map((products) =>
  //     products.filter((product) =>
  //       this.selectedCategoryId
  //         ? product.categoryId === this.selectedCategoryId
  //         : true
  //     )
  //   )
  // );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
