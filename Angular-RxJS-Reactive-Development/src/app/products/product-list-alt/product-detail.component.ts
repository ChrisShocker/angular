import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Supplier } from '../../suppliers/supplier';
import { ProductService } from '../product.service';
import { EMPTY, catchError, combineLatest, filter, map } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  errorMessage = '';

  // create stream to service selectedProduct to return a specific product
  product$ = this.productService.selectedProduct$.pipe(
    catchError((error) => {
      console.error(error);
      return EMPTY;
    })
  );

  // Ancillary stream that pulls the product name from the selected product and adds it to the page title
  pageTitle$ = this.product$.pipe(
    map((p) => (p ? `Product Detail for: ${p.productName}` : null))
  );

  productSuppliers$ = this.productService.selectedProductSuppliers$.pipe(
    catchError((error) => {
      console.error(error);
      return EMPTY;
    })
  );

  // combine all obversables into a single stream
  // combineLatest will wait for all observables to emit at least once before emitting and return an array of the latest values
  vm$ = combineLatest([
    this.product$,
    this.productSuppliers$,
    this.pageTitle$,
  ]).pipe(
    // destructure the first array element [product] to get the product
    // use boolean to check if product is undefined or null
    filter(([product]) => Boolean(product)),
    // destructure the entire combineLatest array and define variables for each observable
    // map the array to an object with the variables as properties
    map(([product, productSuppliers, pageTitle]) => ({
      product,
      productSuppliers,
      pageTitle,
    }))
  );

  constructor(private productService: ProductService) {}
}
