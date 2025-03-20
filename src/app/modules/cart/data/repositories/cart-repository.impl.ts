import { Injectable } from '@angular/core';
import { CartInterface } from '../../core/interfaces/cart.interface';
import { Observable, of, switchMap } from 'rxjs';
import { Cart } from '../../core/entities/cart.entity';
import { Item } from '../../core/entities/item.entity';
import { CART_REPOSITORY } from '../../core/tokens';
import { Shipping } from '../../core/entities/shipping.entity';
import { Discount } from '../../core/entities/discount.entity';

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
      [], // cart_level_discount_applications
      null
    );
  }

  private createCartInstance(cartData: any): Cart {
    return new Cart(
      cartData.token,
      cartData.note,
      cartData.attributes,
      cartData.original_total_price,
      cartData.total_price,
      cartData.total_discount,
      cartData.total_weight,
      cartData.item_count,
      cartData.items.map(
        (item: any) =>
          new Item(
            item.id,
            item.properties,
            item.quantity,
            item.variant_id,
            item.key,
            item.title,
            item.price,
            item.original_price,
            item.presentment_price,
            item.discounted_price,
            item.line_price,
            item.original_line_price,
            item.total_discount,
            item.discounts,
            item.sku,
            item.grams,
            item.vendor,
            item.taxable,
            item.product_id,
            item.product_has_only_default_variant,
            item.gift_card,
            item.final_price,
            item.final_line_price,
            item.url,
            item.featured_image,
            item.image,
            item.handle,
            item.requires_shipping,
            item.product_type,
            item.product_title,
            item.product_description,
            item.variant_options,
            item.options_with_values,
            item.line_level_discount_allocations,
            item.line_level_total_discount,
            item.has_components,
            item.variant_title
          )
      ),
      cartData.requires_shipping,
      cartData.currency,
      cartData.items_subtotal_price,
      cartData.cart_level_discount_applications.map(
        (discount: any) =>
          new Discount(
            discount.id,
            discount.code,
            discount.type,
            discount.value,
            discount.description
          )
      ),
      cartData.shipping
        ? new Shipping(
            cartData.shipping.id,
            cartData.shipping.icon,
            cartData.shipping.title,
            cartData.shipping.price,
            cartData.shipping.description
          )
        : null
    );
  }

  private updateCartData(cart: Cart): void {
    if (cart.items.length === 0) {
      this.clearCart(); // Si el carrito está vacío, reinicializarlo
    } else {
      cart.recalculateCart(); // Recalcular el carrito
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }
  }

  getCart(): Observable<Cart> {
    const cartJson = localStorage.getItem(this.storageKey);
    const cart: Cart = cartJson ? JSON.parse(cartJson) : this.createEmptyCart();
    return of(this.createCartInstance(cart));
  }

  addToCart(item: Item): Observable<void> {
    return this.getCart().pipe(
      switchMap((cart) => {
        const existingItem = cart.items.find(
          (i) => i.id === item.id && i.variant_id === item.variant_id
        );
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

  updateItemQuantity(item: Item, quantityChange: number): Observable<void> {
    return this.getCart().pipe(
      switchMap((cart) => {
        const itemFound: any = cart.items.find(
          (i) => i.id === item.id && i.variant_id === item.variant_id
        );
        if (itemFound) {
          const newQuantity = itemFound.quantity + quantityChange;
          if (newQuantity > 0) {
            itemFound.quantity = newQuantity;
            itemFound.recalculateLinePrice();
            this.updateCartData(cart);
          }
        }
        this.updateCartData(cart);
        return of(undefined);
      })
    );
  }

  removeFromCart(item: Item): Observable<void> {
    return this.getCart().pipe(
      switchMap((cart) => {
        cart.items = cart.items.filter((i) => i.variant_id !== item.variant_id);
        this.updateCartData(cart);
        return of(undefined);
      })
    );
  }

  updateCart(cart: Cart): Observable<void> {
    cart.recalculateCart(); // Recalcular el carrito
    this.updateCartData(cart);
    return of(undefined);
  }

  clearCart(): Observable<void> {
    localStorage.removeItem(this.storageKey);
    return of(undefined);
  }

  applyShipping(shipping: Shipping): Observable<void> {
    return this.getCart().pipe(
      switchMap((cart) => {
        cart.shipping = shipping;
        cart.recalculateCart(); // Recalcular el carrito
        this.updateCartData(cart);
        return of(undefined);
      })
    );
  }

  applyDiscount(discount: Discount): Observable<void> {
    return this.getCart().pipe(
      switchMap((cart) => {
        cart.cart_level_discount_applications.push(discount);
        cart.recalculateCart(); // Recalcular el carrito
        this.updateCartData(cart);
        return of(undefined);
      })
    );
  }

  removeDiscount(discountId: string): Observable<void> {
    return this.getCart().pipe(
      switchMap((cart) => {
        cart.cart_level_discount_applications =
          cart.cart_level_discount_applications.filter(
            (d) => d.id !== discountId
          );
        cart.recalculateCart(); // Recalcular el carrito
        this.updateCartData(cart);
        return of(undefined);
      })
    );
  }
}

export const CART_REPOSITORY_PROVIDER = {
  provide: CART_REPOSITORY,
  useClass: CartRepositoryImpl,
};
