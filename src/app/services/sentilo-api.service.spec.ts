import { TestBed } from '@angular/core/testing';

import { SentiloApiService } from './sentilo-api.service';

describe('SentiloApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SentiloApiService = TestBed.get(SentiloApiService);
    expect(service).toBeTruthy();
  });
});
