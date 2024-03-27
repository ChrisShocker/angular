import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';

  products$ = this.productService.products$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  sub!: Subscription;

  constructor(private productService: ProductService) {}

  // Get current selected product to update UI
  selectedProduct$ = this.productService.selectedProduct$;

  onSelected(productId: number): void {
    this.productService.productSelectionChange(productId);
  }
}
