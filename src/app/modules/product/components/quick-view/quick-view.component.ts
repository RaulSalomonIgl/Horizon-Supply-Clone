import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../core/entities/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { StarRatingComponent } from '../../../../components/star-rating/star-rating.component';
import { SvgIconComponent } from '../../../../icons/svg-icon/svg-icon.component';

@Component({
  selector: 'app-quick-view',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, StarRatingComponent, SvgIconComponent],
  templateUrl: './quick-view.component.html',
  styleUrl: './quick-view.component.css',
})
export class QuickViewComponent implements OnInit {
  @Input() open: boolean = false; // Controla la visibilidad del modal
  @Output() openChange = new EventEmitter<boolean>(); // Emite el cambio de visibilidad
  @Input() product!: Product;

  selectedSize: string = '';
  quantity: number = 1;
  selectedImage: number = 0;
  startIndex: number = 0; // Índice para las imágenes mostradas
  itemsPerPage: number = 3; // Número de imágenes a mostrar

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

  handleQuantityChange(action: 'increase' | 'decrease'): void {
    if (action === 'increase') {
      this.quantity += 1;
    } else if (action === 'decrease' && this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  closeQuickview() {
    this.openChange.emit(false);
    this.enableBackgroundScroll();
  }

  setCover(p_index: number) {
    this.selectedImage = p_index;
  }

  nextImages(): void {
    if (this.startIndex + this.itemsPerPage < this.product.images.length) {
      this.startIndex += this.itemsPerPage;
    }
  }

  // Función para retroceder en las imágenes
  previousImages(): void {
    if (this.startIndex > 0) {
      this.startIndex -= this.itemsPerPage;
    }
  }
}
