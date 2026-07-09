import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { sidenavResolver } from './sidenav-resolver';

describe('sidenavResolver', () => {
  const executeResolver: ResolveFn<unknown> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => sidenavResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
