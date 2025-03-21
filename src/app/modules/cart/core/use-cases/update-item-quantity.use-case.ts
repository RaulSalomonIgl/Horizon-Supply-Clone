import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Observable } from 'rxjs';
import { Item } from '../entities/item.entity';

@Injectable({ providedIn: 'root' })
export class UpdateItemQuantityUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartRepository: CartInterface) {}

  execute(item: Item, quantity: number): Observable<void> {
    return this.cartRepository.updateItemQuantity(item, quantity);
  }
}
