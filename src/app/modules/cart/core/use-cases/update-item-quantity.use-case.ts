import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateItemQuantityUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartRepository: CartInterface) {}

  execute(itemId: number, quantity: number): Observable<void> {
    return this.cartRepository.updateItemQuantity(itemId, quantity);
  }
}
