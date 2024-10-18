import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);  // Inyectar el servicio de autenticación
  const router = inject(Router);  // Inyectar el router

  if (authService.isAuthenticated()) {
    return true;  // Permitir acceso si el usuario está autenticado
  } else {
    router.navigate(['/auth/login']);  // Redirigir al login si no está autenticado
    return false;
  }
};
