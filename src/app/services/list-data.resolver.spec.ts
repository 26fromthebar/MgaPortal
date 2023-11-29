import { TestBed } from '@angular/core/testing';

import { ListDataResolver } from './list-data.resolver';

describe('ListDataResolver', () => {
  let resolver: ListDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
