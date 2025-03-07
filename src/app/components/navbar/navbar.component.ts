import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CurrencySelectorComponent } from '../currency-selector/currency-selector.component';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Collection } from '../../modules/product/core/entities/collection.model';
import { GetCollectionsUseCase } from '../../modules/product/core/use-cases/get-collection.use-case';
import { COLLECTION_REPOSITORY_PROVIDER } from '../../modules/product/data/repositories/collection-repository.impl';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencySelectorComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [COLLECTION_REPOSITORY_PROVIDER, GetCollectionsUseCase],
})
export class NavbarComponent implements OnInit {
  collections$: Observable<Collection[]> = new Observable();

  _isSidebarOpen: boolean = false;
  _isUserMenuOpen: boolean = false;

  constructor(private getCollections: GetCollectionsUseCase) {}

  ngOnInit(): void {
    this.collections$ = this.getCollections.execute();
  }

  toggleSidebar() {
    this._isSidebarOpen = !this._isSidebarOpen;
  }

  toggleUserMenu() {
    this._isUserMenuOpen = !this._isUserMenuOpen;
  }
}
