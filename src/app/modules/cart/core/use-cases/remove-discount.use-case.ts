import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RemoveDiscountUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartRepository: CartInterface) {}

  execute(discountId: string): Observable<void> {
    return this.cartRepository.removeDiscount(discountId);
  }
}
