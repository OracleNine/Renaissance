import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoreApi } from '../../core-api';
import { catchError, of } from 'rxjs';

export const wikisResolver: ResolveFn<unknown> = (route, state) => {
  const apiService = inject(CoreApi)

  return apiService.getWikis().pipe(
    catchError(error => of({
      'status' : 0
    }))
  )
};
