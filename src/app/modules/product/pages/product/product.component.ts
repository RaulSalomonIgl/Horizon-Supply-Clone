import { Component, OnInit } from '@angular/core';
import { SvgIconComponent } from '../../../../icons/svg-icon/svg-icon.component';
import { ImageViewerComponent } from '../../components/image-viewer/image-viewer.component';
import { StarRatingComponent } from '../../../../components/star-rating/star-rating.component';
import { SizeSelectorComponent } from '../../components/size-selector/size-selector.component';
import { ChooseQuantityComponent } from '../../../../components/choose-quantity/choose-quantity.component';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../../core/entities/product.model';
import { ActivatedRoute } from '@angular/router';
import { GetProductByIdUseCase } from '../../core/use-cases/get-product-by-id.use-case';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PRODUCT_REPOSITORY_PROVIDER } from '../../data/repositories/product-repository.impl';
import { SummaryChartComponent } from '../../components/summary-chart/summary-chart.component';
import { SpecificationsComponent } from '../../components/specifications/specifications.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    ImageViewerComponent,
    StarRatingComponent,
    SizeSelectorComponent,
    ChooseQuantityComponent,
    ActionButtonsComponent,
    SummaryChartComponent,
    SpecificationsComponent,
    ReviewsComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [PRODUCT_REPOSITORY_PROVIDER, GetProductByIdUseCase],
})
export class ProductComponent implements OnInit {
  product$: Observable<Product> = new Observable(); // Observable para el producto
  constructor(
    private route: ActivatedRoute, // Para obtener el parámetro de la ruta
    private getProductById: GetProductByIdUseCase // Caso de uso para obtener el producto
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la ruta y usarlo para obtener el producto
    this.product$ = this.route.params.pipe(
      switchMap((params) => {
        const productId = params['id']; // Extraer el 'id' de la URL
        return this.getProductById.execute(productId); // Obtener el producto por ID
      })
    );
  }
}
