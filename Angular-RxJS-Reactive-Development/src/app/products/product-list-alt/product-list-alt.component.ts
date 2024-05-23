import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMPTY, Subject, Subscription, catchError } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  products$ = this.productService.productWithCategories$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
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
