import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../modules/product/components/product-card/product-card.component';
import { PRODUCT_REPOSITORY_PROVIDER } from '../../modules/product/data/repositories/product-repository.impl';
import { GetProductsUseCase } from '../../modules/product/core/use-cases/get-products.use-case';
import { Observable } from 'rxjs';
import { Product } from '../../modules/product/core/entities/product.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [PRODUCT_REPOSITORY_PROVIDER, GetProductsUseCase],
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();
  pagedProducts: Product[] = []; // Productos de la página actual

  constructor(private getProducts: GetProductsUseCase) {}

  ngOnInit(): void {
    this.products$ = this.getProducts.execute();
  }

  // Actualizar la lista de productos cuando cambie la página
  onPageChange(pagedItems: Product[]): void {
    this.pagedProducts = pagedItems;
  }
}
