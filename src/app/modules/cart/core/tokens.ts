import { InjectionToken } from '@angular/core';
import { CartInterface } from './interfaces/cart.interface';

export const CART_REPOSITORY = new InjectionToken<CartInterface>(
  'CartInterface'
);
