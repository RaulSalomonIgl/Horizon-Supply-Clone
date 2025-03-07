import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { SearchComponent } from './pages/search/search.component';

export const PRODUCT_ROUTES: Routes = [
  { path: 'product/:id', component: ProductComponent }, // Ruta para ver los detalles de un producto específico
  { path: 'collections/:category', component: ProductCategoryComponent }, // Ruta para filtrar productos por categoría
  { path: 'search/:query', component: SearchComponent }, // Ruta para buscar productos
];
