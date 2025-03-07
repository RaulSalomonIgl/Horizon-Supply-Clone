import { InjectionToken } from '@angular/core';
import { ProductRepository } from './interfaces/product-repository.interface';
import { CollectionInterface } from './interfaces/collection.interface';

export const PRODUCT_REPOSITORY = new InjectionToken<ProductRepository>(
  'ProductRepository'
);

export const COLLECTION_REPOSITORY = new InjectionToken<CollectionInterface>(
  'CollectionRepository'
);
