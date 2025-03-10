import { Inject, Injectable } from '@angular/core';
import { PRODUCT_REPOSITORY } from '../tokens';
import { ProductRepository } from '../interfaces/product-repository.interface';
import { Observable } from 'rxjs';
import { Product } from '../entities/product.model';

@Injectable({ providedIn: 'root' })
export class GetProductByIdUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: ProductRepository
  ) {}

  execute(id: number): Observable<Product> {
    return this.productRepository.getProductById(id); // Obtener el producto por ID
  }
}
