import { Component, Input } from '@angular/core';
import { Product } from '../../core/entities/product.model';
import { CommonModule } from '@angular/common';
import { FindMaterialsInParagraphPipe } from '../../pipes/find-materials-in-paragraph.pipe';
import { FindConsiderationsInParagraphPipe } from '../../pipes/find-considerations-in-paragraph.pipe';

@Component({
  selector: 'app-specifications',
  standalone: true,
  imports: [
    CommonModule,
    FindMaterialsInParagraphPipe,
    FindConsiderationsInParagraphPipe,
  ],
  templateUrl: './specifications.component.html',
  styleUrl: './specifications.component.css',
})
export class SpecificationsComponent {
  @Input() product!: Product;
}
