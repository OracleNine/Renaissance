import { TestBed } from '@angular/core/testing';

import { WikiApi } from './wiki-api';

describe('Api', () => {
  let service: WikiApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
