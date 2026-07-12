import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { WikiApi } from '../wiki-api';
import { catchError, of } from 'rxjs';

export const pageResolver: ResolveFn<unknown> = (route, state) => {
  const apiService = inject(WikiApi)
  const subdomain = route.paramMap.get('wSubdomain')
  const slug = route.paramMap.get('pSlug')

  if (subdomain && slug) {
    return apiService.viewPage(subdomain, slug)
    .pipe(
        catchError(error => of({
          'status' : 0
        }))
  )}

  return false
};
