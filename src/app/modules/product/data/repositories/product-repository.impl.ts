import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../../core/entities/product.model';
import { PRODUCT_REPOSITORY } from '../../core/tokens';
import { ProductRepository } from '../../core/interfaces/product-repository.interface';

@Injectable({ providedIn: 'root' })
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>('/assets/data/products.json')
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

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product[]>(`/assets/data/products.json`).pipe(
      map((data) => {
        const product = data.find((product) => product.id == id);

        if (product === undefined) {
          throw new Error(`Product with id ${id} not found`);
        }

        return new Product(
          product.id,
          product.title,
          product.handle,
          product.description,
          product.published_at,
          product.created_at,
          product.vendor,
          product.type,
          product.tags,
          product.price,
          product.price_min,
          product.price_max,
          product.available,
          product.price_varies,
          product.compare_at_price_min,
          product.compare_at_price_max,
          product.compare_at_price_varies,
          product.variants,
          product.images,
          product.featured_image,
          product.options,
          product.media,
          product.requires_selling_plan,
          product.selling_plan_groups,
          product.content,
          product.compare_at_price
        );
      }),
      catchError((error) => throwError(() => error))
    );
  }
}

export const PRODUCT_REPOSITORY_PROVIDER = {
  provide: PRODUCT_REPOSITORY,
  useClass: ProductRepositoryImpl,
};
