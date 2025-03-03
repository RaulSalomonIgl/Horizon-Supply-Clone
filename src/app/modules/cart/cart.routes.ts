import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';

export const CART_ROUTES: Routes = [
  { path: '', component: CartComponent }, // Ruta para ver el carrito de compras del usuario
];
