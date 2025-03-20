import { Observable } from 'rxjs';
import { Item } from '../entities/item.entity';
import { Cart } from '../entities/cart.entity';
import { Shipping } from '../entities/shipping.entity';
import { Discount } from '../entities/discount.entity';

export interface CartInterface {
  getCart(): Observable<Cart>;
  addToCart(item: Item): Observable<void>;
  updateItemQuantity(item: Item, quantity: number): Observable<void>;
  removeFromCart(item: Item): Observable<void>;
  updateCart(cart: Cart): Observable<void>;
  clearCart(): Observable<void>;
  applyShipping(shipping: Shipping): Observable<void>; // Aplicar envío
  applyDiscount(discount: Discount): Observable<void>; // Aplicar descuento
  removeDiscount(discountId: string): Observable<void>; // Eliminar descuento
}
