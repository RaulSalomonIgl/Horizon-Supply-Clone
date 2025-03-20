import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Discount } from '../entities/discount.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplyDiscountUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartRepository: CartInterface) {}

  execute(discount: Discount): Observable<void> {
    return this.cartRepository.applyDiscount(discount);
  }
}
