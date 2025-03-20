import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Observable } from 'rxjs';
import { Item } from '../entities/item.entity';

@Injectable({ providedIn: 'root' })
export class RemoveFromCartUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartInterface: CartInterface) {}

  execute(item: Item): Observable<void> {
    return this.cartInterface.removeFromCart(item);
  }
}
