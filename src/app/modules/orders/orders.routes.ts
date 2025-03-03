import { Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderComponent } from './pages/order/order.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const ORDERS_ROUTES: Routes = [
  { path: '', component: OrdersComponent }, // Ruta para listar todas las órdenes realizadas por el usuario
  { path: 'order/:id', component: OrderComponent }, // Ruta para ver los detalles de una orden específica
  { path: 'order-summary/:id', component: SummaryComponent }, // Ruta para ver los detalles de una orden específica
  { path: 'checkout', component: CheckoutComponent }, // Ruta para proceder al pago
];
