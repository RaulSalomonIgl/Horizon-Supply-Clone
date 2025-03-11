import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RemoveFromCartUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartInterface: CartInterface) {}

  execute(itemId: number): Observable<void> {
    return this.cartInterface.removeFromCart(itemId);
  }
}
