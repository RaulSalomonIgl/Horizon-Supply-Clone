import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Variant } from '../../core/entities/variant.model';

@Component({
  selector: 'app-size-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './size-selector.component.html',
  styleUrl: './size-selector.component.css',
})
export class SizeSelectorComponent {
  @Input() variants!: Variant[];
  @Output() selectedVariantEvent = new EventEmitter<Variant>();

  selectedVariant: string = '';

  onSelectedVariant(variant: Variant) {
    this.selectedVariant = variant.title;
    this.selectedVariantEvent.emit(variant);
  }
}
