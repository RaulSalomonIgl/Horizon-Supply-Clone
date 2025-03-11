import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Item } from '../entities/item.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddToCartUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartInterface: CartInterface) {}

  execute(item: Item): Observable<void> {
    return this.cartInterface.addToCart(item);
  }
}
