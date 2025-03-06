import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../modules/product/components/product-card/product-card.component';
import { PRODUCT_REPOSITORY_PROVIDER } from '../../modules/product/data/repositories/product-repository.impl';
import { GetProductsUseCase } from '../../modules/product/core/use-cases/get-products.use-case';
import { Observable } from 'rxjs';
import { Product } from '../../modules/product/core/entities/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [PRODUCT_REPOSITORY_PROVIDER, GetProductsUseCase],
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();

  constructor(private getProducts: GetProductsUseCase) {}

  ngOnInit(): void {
    this.products$ = this.getProducts.execute();
  }
}
