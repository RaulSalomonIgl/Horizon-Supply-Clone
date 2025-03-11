import { Observable } from 'rxjs';
import { Item } from '../entities/item.entity';
import { Cart } from '../entities/cart.entity';

export interface CartInterface {
  getCart(): Observable<Cart>;
  addToCart(item: Item): Observable<void>;
  removeFromCart(itemId: number): Observable<void>;
  updateCart(cart: Cart): Observable<void>;
  clearCart(): Observable<void>;
}
