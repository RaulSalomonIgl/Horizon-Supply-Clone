import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../core/entities/product.model';
import { PRODUCT_REPOSITORY } from '../../core/tokens';
import { ProductRepository } from '../../core/interfaces/product-repository.interface';

@Injectable({ providedIn: 'root' })
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<any[]>('/assets/data/products.json')
      .pipe(
        map((data) =>
          data.map(
            (item) =>
              new Product(
                item.id,
                item.title,
                item.handle,
                item.description,
                item.published_at,
                item.created_at,
                item.vendor,
                item.type,
                item.tags,
                item.price,
                item.price_min,
                item.price_max,
                item.available,
                item.price_varies,
                item.compare_at_price_min,
                item.compare_at_price_max,
                item.compare_at_price_varies,
                item.variants,
                item.images,
                item.featured_image,
                item.options,
                item.media,
                item.requires_selling_plan,
                item.selling_plan_groups,
                item.content,
                item.compare_at_price
              )
          )
        )
      );
  }
}

export const PRODUCT_REPOSITORY_PROVIDER = {
  provide: PRODUCT_REPOSITORY,
  useClass: ProductRepositoryImpl,
};
