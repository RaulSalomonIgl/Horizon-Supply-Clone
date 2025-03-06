import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepository } from '../interfaces/product-repository.interface';
import { PRODUCT_REPOSITORY } from '../tokens';
import { Product } from '../entities/product.model';

@Injectable({ providedIn: 'root' })
export class GetProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: ProductRepository
  ) {}

  execute(): Observable<Product[]> {
    return this.productRepository.getProducts();
  }
}
