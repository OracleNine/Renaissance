import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CoreApi } from '../core-api';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (childRoute, state) => {
  const apiService = inject(CoreApi)
  const router = inject(Router)
  
  return true
};
