import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent<T> implements OnInit {
  @Input() items: T[] = []; // Lista completa de elementos
  @Input() itemsPerPage: number = 5; // Cantidad de elementos por página
  @Output() pageChange = new EventEmitter<T[]>(); // Emite los elementos de la página actual

  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  pagedItems: T[] = []; // Elementos de la página actual

  // Calcula los elementos de la página actual y el total de páginas
  private updatePagination(): void {
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages); // Asegura que la página actual no exceda el total
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedItems = this.items.slice(startIndex, endIndex);
    this.pageChange.emit(this.pagedItems); // Emite los elementos de la página actual
  }

  ngOnInit(): void {
    this.updatePagination();
  }

  // Actualiza la paginación cuando cambian los inputs
  ngOnChanges(): void {
    this.updatePagination();
  }

  getPages(): number[] {
    const pagesToShow = 5; // Cantidad de botones de página a mostrar
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    let startPage = Math.max(1, this.currentPage - halfPagesToShow);
    let endPage = Math.min(this.totalPages, startPage + pagesToShow - 1);

    // Ajustar el rango si estamos cerca del inicio o del final
    if (endPage - startPage + 1 < pagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Navega a la página anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Navega a la página siguiente
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Navega a una página específica
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}
