import { Inject, Injectable } from '@angular/core';
import { CART_REPOSITORY } from '../tokens';
import { CartInterface } from '../interfaces/cart.interface';
import { Shipping } from '../entities/shipping.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplyShippingUseCase {
  constructor(@Inject(CART_REPOSITORY) private cartRepository: CartInterface) {}

  execute(shipping: Shipping): Observable<void> {
    return this.cartRepository.applyShipping(shipping);
  }
}
