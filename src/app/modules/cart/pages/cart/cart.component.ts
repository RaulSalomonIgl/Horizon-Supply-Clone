import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../core/entities/cart.entity';
import { GetCartUseCase } from '../../core/use-cases/get-cart.use-case';
import { RemoveFromCartUseCase } from '../../core/use-cases/remove-from-cart.use-case';
import { ClearCartUseCase } from '../../core/use-cases/clear-cart.use-case';
import { CART_REPOSITORY_PROVIDER } from '../../data/repositories/cart-repository.impl';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SvgIconComponent } from '../../../../icons/svg-icon/svg-icon.component';
import { UpdateItemQuantityUseCase } from '../../core/use-cases/update-item-quantity.use-case';
import { RouterLink } from '@angular/router';
import { Item } from '../../core/entities/item.entity';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, SvgIconComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [
    CART_REPOSITORY_PROVIDER,
    GetCartUseCase,
    RemoveFromCartUseCase,
    ClearCartUseCase,
    UpdateItemQuantityUseCase,
  ],
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart> = new Observable();

  constructor(
    private getCart: GetCartUseCase,
    private removeFromCart: RemoveFromCartUseCase,
    private clearCart: ClearCartUseCase,
    private updateItemQuantity: UpdateItemQuantityUseCase
  ) {}

  ngOnInit(): void {
    this.cart$ = this.getCart.execute();
  }

  onIncreaseQuantity(item: Item): void {
    this.updateItemQuantity.execute(item, 1).subscribe(() => {
      this.cart$ = this.getCart.execute(); // Actualizar el carrito
    });
  }

  onDecreaseQuantity(item: Item): void {
    this.updateItemQuantity.execute(item, -1).subscribe(() => {
      this.cart$ = this.getCart.execute(); // Actualizar el carrito
    });
  }

  onRemoveItem(item: Item): void {
    this.removeFromCart.execute(item).subscribe(() => {
      this.cart$ = this.getCart.execute(); // Actualizar el carrito
    });
  }

  onClearCart(): void {
    this.clearCart.execute().subscribe(() => {
      this.cart$ = this.getCart.execute(); // Actualizar el carrito
    });
  }
}
