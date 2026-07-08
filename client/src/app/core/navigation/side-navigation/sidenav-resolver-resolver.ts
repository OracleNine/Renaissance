import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Api } from '../../api';
import { catchError, of } from 'rxjs';

export const sidenavResolverResolver: ResolveFn<unknown> = (route, state) => {
  const apiService = inject(Api)

  return apiService.getUserInfo().pipe(
    catchError(error => of({
      'status' : 0
    }))
  )
};
