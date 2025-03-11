import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Observable } from 'rxjs';
import { Cart } from '../entities/cart.entity';

@Injectable({ providedIn: 'root' })
export class GetCartUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartInterface: CartInterface) {}

  execute(): Observable<Cart> {
    return this.cartInterface.getCart();
  }
}
