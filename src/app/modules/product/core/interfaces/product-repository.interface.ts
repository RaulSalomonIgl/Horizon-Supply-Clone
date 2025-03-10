import { Observable } from 'rxjs';
import { Product } from '../entities/product.model';

export interface ProductRepository {
  getProducts(): Observable<Product[]>;
  getProductById(id: number): Observable<Product>;
}
