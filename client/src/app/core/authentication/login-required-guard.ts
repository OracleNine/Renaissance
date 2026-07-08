import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router} from '@angular/router';
import { AuthStatus } from './auth-status';
import { inject } from '@angular/core';

export const loginRequiredGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => {
  const auth = inject(AuthStatus)
  const router = inject(Router)
  if (!auth.isAuthenticated()) {
    return router.createUrlTree(["/login"])
  }
  return true
};
