import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  selectedSize: string = '';
}
