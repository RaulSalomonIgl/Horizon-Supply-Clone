import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../core/entities/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { StarRatingComponent } from '../../../../components/star-rating/star-rating.component';
import { SvgIconComponent } from '../../../../icons/svg-icon/svg-icon.component';
import { ChooseQuantityComponent } from '../../../../components/choose-quantity/choose-quantity.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { SizeSelectorComponent } from '../size-selector/size-selector.component';
import { Variant } from '../../core/entities/variant.model';
import { Item } from '../../../cart/core/entities/item.entity';
import { CART_REPOSITORY_PROVIDER } from '../../../cart/data/repositories/cart-repository.impl';
import { AddToCartUseCase } from '../../../cart/core/use-cases/add-to-cart.use-case';

@Component({
  selector: 'app-quick-view',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    StarRatingComponent,
    SvgIconComponent,
    ChooseQuantityComponent,
    ImageViewerComponent,
    ActionButtonsComponent,
    SizeSelectorComponent,
  ],
  templateUrl: './quick-view.component.html',
  styleUrl: './quick-view.component.css',
  providers: [CART_REPOSITORY_PROVIDER, AddToCartUseCase],
})
export class QuickViewComponent implements OnInit {
  @Input() open: boolean = false; // Controla la visibilidad del modal
  @Output() openChange = new EventEmitter<boolean>(); // Emite el cambio de visibilidad
  @Input() product!: Product;

  private selectedVariant!: Variant;
  private selectedQuantity: number = 1;

  isButtonsDisabled: boolean = true;

  constructor(private addToCart: AddToCartUseCase) {}

  // Método para deshabilitar el desplazamiento del fondo
  private disableBackgroundScroll() {
    document.body.style.overflow = 'hidden';
  }

  // Método para habilitar el desplazamiento del fondo
  private enableBackgroundScroll() {
    document.body.style.overflow = 'auto';
  }

  ngOnInit(): void {
    this.disableBackgroundScroll();
  }

  closeQuickview() {
    this.openChange.emit(false);
    this.enableBackgroundScroll();
  }

  setVariant(variant: Variant) {
    this.isButtonsDisabled = false;
    this.selectedVariant = variant;
  }

  setQuantity(quantity: number) {
    this.selectedQuantity = quantity;
  }

  actionButton(action: string, product: Product) {
    switch (action) {
      case 'addToCart':
        this.onAddToCart(product);
    }
  }

  onAddToCart(product: Product) {
    const item = Item.fromProduct(
      product,
      this.selectedQuantity,
      this.selectedVariant,
      []
    ); // Convertir el producto en un Item
    this.addToCart.execute(item).subscribe(() => {
      alert('Producto agregado al carrito'); // Mostrar un mensaje de confirmación
    });
  }
}
