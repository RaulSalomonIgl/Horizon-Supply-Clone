import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export const AUTH_ROUTES: Routes = [
  { path: '', component: LoginComponent }, // Ruta para el inicio de sesión de usuarios
  { path: 'register', component: RegisterComponent }, // Ruta para el registro de nuevos usuarios
  { path: 'forgot-password', component: ForgotPasswordComponent }, // Ruta para recuperar la contraseña
  { path: 'reset-password/:token', component: ResetPasswordComponent }, // Ruta para restablecer la contraseña
];
