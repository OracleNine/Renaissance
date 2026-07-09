import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { wikisResolver } from './wikis-resolver';

describe('wikisResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => wikisResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
