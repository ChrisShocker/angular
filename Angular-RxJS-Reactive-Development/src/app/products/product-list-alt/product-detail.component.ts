import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Supplier } from '../../suppliers/supplier';
import { ProductService } from '../product.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  errorMessage = '';
  productSuppliers: Supplier[] | null = null;

  // create stream to service selectedProduct to return a specific product
  product$ = this.productService.selectedProduct$.pipe(
    catchError((error) => {
      console.error(error);
      return EMPTY;
    })
  );

  constructor(private productService: ProductService) {}
}
