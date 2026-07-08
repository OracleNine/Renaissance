import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router} from '@angular/router';

export const loginRequiredGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => {
  
  return true
};
