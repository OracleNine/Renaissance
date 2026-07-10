import { inject } from '@angular/core';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { Api } from '../../api';
import { catchError, of } from 'rxjs';

export const pageResolver: ResolveFn<unknown> = (route, state) => {
  const apiService = inject(Api)
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
