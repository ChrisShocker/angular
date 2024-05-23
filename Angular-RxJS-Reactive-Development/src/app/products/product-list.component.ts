import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  BehaviorSubject,
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

  // a BehaviourSubject can be used instead to set the default value instead of startWith()
  private categorySelectedSubject1 = new BehaviorSubject<number>(0);
  categorySelectedAction1$ = this.categorySelectedSubject1.asObservable();

  // Note: combineLatest doesn't set an initial value, and won't emit until each of it's input streams emit, subscribers will be given nothing to display, a BehaviourSubject can be used instead of a subject to set a initila value or a pipe with 'startWith() on the observable'
  products$ = combineLatest([
    this.productService.productWithCategories$,
    this.categorySelectedAction1$,
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
