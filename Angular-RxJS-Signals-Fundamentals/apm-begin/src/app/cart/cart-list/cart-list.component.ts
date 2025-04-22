import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CartItem } from '../cart';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from '../cart.service';
import { CartShellComponent } from '../cart-shell/cart-shell.component';

@Component({
  selector: 'sw-cart-list',
  standalone: true,
  imports: [CartItemComponent, CartShellComponent, NgFor, NgIf],
  templateUrl: 'cart-list.component.html',
})
export class CartListComponent {
  pageTitle = 'Cart';

  private cartService = inject(CartService);

  // create a variable to allow to prevent template from accessing service directly
  cartItems = this.cartService.cartItems;
}
