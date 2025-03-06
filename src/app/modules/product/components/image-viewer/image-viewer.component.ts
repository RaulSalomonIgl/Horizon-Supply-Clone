import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Medum } from '../../core/entities/medum.model';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.css',
})
export class ImageViewerComponent {
  @Input() media!: Medum[];

  selectedImage: number = 0;
  startIndex: number = 0; // Índice para las imágenes mostradas
  itemsPerPage: number = 3; // Número de imágenes a mostrar

  setCover(p_index: number) {
    this.selectedImage = p_index;
  }

  nextImages(): void {
    if (this.startIndex + this.itemsPerPage < this.media.length) {
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
