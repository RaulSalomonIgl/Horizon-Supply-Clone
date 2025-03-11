import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClearCartUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartInterface: CartInterface) {}

  execute(): Observable<void> {
    return this.cartInterface.clearCart();
  }
}
