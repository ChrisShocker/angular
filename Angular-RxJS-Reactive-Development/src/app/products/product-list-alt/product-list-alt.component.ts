import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMPTY, Subject, Subscription, catchError } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  /*
   * OnPush only detects changes made
   * to input properties and events from child components
   * and observables bound in the template using the async pipe.
   * Bound values set in local properties are not detected and won't change the UI.
   */
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  // set error message to be an action stream to allow change detection to occur in the UI from OnPush detection strategy.
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
