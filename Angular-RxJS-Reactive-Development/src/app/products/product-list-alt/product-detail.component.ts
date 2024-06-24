import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Supplier } from '../../suppliers/supplier';
import { ProductService } from '../product.service';
import { EMPTY, catchError, map } from 'rxjs';

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

  constructor(private productService: ProductService) {}
}
