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

  // Deb K way:
  subTotal = computed(() =>
    this.cartItems().reduce(
      (accTotal, item) => accTotal + item.quantity * item.product.price,
      0
    )
  );

  deliveryFee = computed<number>(() => (this.subTotal() < 50 ? 5.99 : 0));

  tax = computed(() => Math.round((this.subTotal() * 10.75) / 100));

  totalPrice = computed(
    () => this.subTotal() + this.deliveryFee() + this.tax()
  );

  // original attempt, do it all at once with a fixed tax and shipping
  cartSubtotal = computed(() => this.getCartTotal(this.cartItems()));

  getCartTotal(cartItems: CartItem[]): number {
    let cartSubtotal = cartItems.reduce(
      (sum, item) => (sum += item.quantity * item.product.price),
      0
    );

    if (cartSubtotal < 50) {
      return cartSubtotal + cartSubtotal * (10.75 / 100) + 5.99;
    } else {
      return cartSubtotal + cartSubtotal * (10.75 / 100);
    }
  }

  // effects are like tap for signals
  eLength = effect(() => console.log('Cart length ' + this.cartItems().length));

  addToCart(product: Product): void {
    // we must update the array/object to trigger the signal updates have ocurred
    this.cartItems.update((items) => [...items, { product, quantity: 1 }]);
  }
}
