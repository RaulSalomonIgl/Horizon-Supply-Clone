import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../core/entities/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { StarRatingComponent } from '../../../../components/star-rating/star-rating.component';
import { SvgIconComponent } from '../../../../icons/svg-icon/svg-icon.component';
import { ChooseQuantityComponent } from '../../../../components/choose-quantity/choose-quantity.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { SizeSelectorComponent } from '../size-selector/size-selector.component';

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
})
export class QuickViewComponent implements OnInit {
  @Input() open: boolean = false; // Controla la visibilidad del modal
  @Output() openChange = new EventEmitter<boolean>(); // Emite el cambio de visibilidad
  @Input() product!: Product;

  quantity: number = 1;

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
}
