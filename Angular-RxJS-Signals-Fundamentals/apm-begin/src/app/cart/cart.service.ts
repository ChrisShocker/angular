import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from './cart';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() =>
    this.cartItems().reduce((accQty, item) => accQty + item.quantity, 0)
  );

  // effects are like tap for signals
  eLength = effect(() => console.log('Cart length ' + this.cartItems().length));

  addToCart(product: Product): void {
    // we must update the array/object to trigger the signal updates have ocurred
    this.cartItems.update((items) => [...items, { product, quantity: 1 }]);
  }
}
