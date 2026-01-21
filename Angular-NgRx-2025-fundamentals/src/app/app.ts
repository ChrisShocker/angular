import { Component } from '@angular/core';
import { ProductsListComponent } from './products/products-list.component';

@Component({
  selector: 'app-root',
  imports: [ProductsListComponent],
  template: `
    <app-products-list />
  `,
})
export class App {
}
