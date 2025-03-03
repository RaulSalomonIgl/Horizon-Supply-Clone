import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'cart',
        loadChildren: () =>
          import('./modules/cart/cart.routes').then((m) => m.CART_ROUTES),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./modules/orders/orders.routes').then((m) => m.ORDERS_ROUTES),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/product/product.routes').then(
            (m) => m.PRODUCT_ROUTES
          ),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },

  //Rutas para control de incidentes
  // Ruta para páginas no encontradas
  { path: '**', redirectTo: '/404' },
];
