import { Component, Input } from '@angular/core';
import { Product } from '../../core/entities/product.model';
import { RouterLink } from '@angular/router';
import { QuickViewComponent } from '../quick-view/quick-view.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, QuickViewComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  isModalOpen: boolean = false;

  toggleQuickview() {
    this.isModalOpen = !this.isModalOpen;
  }
}
