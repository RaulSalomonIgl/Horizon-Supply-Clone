import { Injectable } from '@angular/core';
import { CartInterface } from '../../core/interfaces/cart.interface';
import { Observable, of, switchMap } from 'rxjs';
import { Cart } from '../../core/entities/cart.entity';
import { Item } from '../../core/entities/item.entity';
import { CART_REPOSITORY } from '../../core/tokens';

@Injectable({ providedIn: 'root' })
export class CartRepositoryImpl implements CartInterface {
  private readonly storageKey = 'cart';

  private generarToken(): string {
    return window.crypto.randomUUID(); // Genera un UUID único
  }

  private createEmptyCart(): Cart {
    return new Cart(
      this.generarToken(), // token
      '', // note
      {}, // attributes
      0, // original_total_price
      0, // total_price
      0, // total_discount
      0, // total_weight
      0, // item_count
      [], // items
      false, // requires_shipping
      'GBP', // currency
      0, // items_subtotal_price
      [] // cart_level_discount_applications
    );
  }

  private updateCartData(cart: Cart): void {
    const total_price = cart.items.reduce((sum, current) => {
      return sum + current.price * current.quantity;
    }, 0);

    const discount = cart.items.reduce((sum, current) => {
      return sum + current.total_discount;
    }, 0);

    const weight = cart.items.reduce((sum, current) => {
      return sum + current.grams;
    }, 0);

    cart.original_total_price = total_price;
    cart.total_price = total_price - discount;
    cart.total_discount = discount;
    cart.total_weight = weight;
    cart.item_count = cart.items.length;
    cart.requires_shipping = cart.items.length > 0;
    cart.items_subtotal_price = total_price;
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  getCart(): Observable<Cart> {
    const cartJson = localStorage.getItem(this.storageKey);
    const cart: Cart = cartJson ? JSON.parse(cartJson) : this.createEmptyCart();
    return of(cart);
  }

  addToCart(item: Item): Observable<void> {
    return this.getCart().pipe(
      switchMap((cart) => {
        const existingItem = cart.items.find((i) => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.items.push(item);
        }
        this.updateCartData(cart);
        return of(undefined);
      })
    );
  }

  updateItemQuantity(itemId: number, quantityChange: number): Observable<void> {
    return this.getCart().pipe(
      switchMap((cart) => {
        debugger;
        const item = cart.items.find((i) => i.id === itemId);
        if (item) {
          const newQuantity = item.quantity + quantityChange;
          if (newQuantity > 0) {
            item.quantity = newQuantity;
            this.updateCartData(cart);
          }
        }
        this.updateCartData(cart);
        return of(undefined);
      })
    );
  }

  removeFromCart(itemId: number): Observable<void> {
    return this.getCart().pipe(
      switchMap((cart) => {
        cart.items = cart.items.filter((item) => item.id !== itemId);
        this.updateCartData(cart);
        return of(undefined);
      })
    );
  }

  updateCart(cart: Cart): Observable<void> {
    this.updateCartData(cart);
    return of(undefined);
  }

  clearCart(): Observable<void> {
    localStorage.removeItem(this.storageKey);
    return of(undefined);
  }
}

export const CART_REPOSITORY_PROVIDER = {
  provide: CART_REPOSITORY,
  useClass: CartRepositoryImpl,
};
