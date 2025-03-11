import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Cart } from '../entities/cart.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateCartUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartInterface: CartInterface) {}

  execute(cart: Cart): Observable<void> {
    return this.cartInterface.updateCart(cart);
  }
}
