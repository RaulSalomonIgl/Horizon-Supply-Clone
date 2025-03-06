import { InjectionToken } from '@angular/core';
import { ProductRepository } from './interfaces/product-repository.interface';

export const PRODUCT_REPOSITORY = new InjectionToken<ProductRepository>(
  'ProductRepository'
);
