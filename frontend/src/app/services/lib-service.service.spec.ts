import { TestBed } from '@angular/core/testing';

import { LibServiceService } from './lib-service.service';

describe('LibServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibServiceService = TestBed.get(LibServiceService);
    expect(service).toBeTruthy();
  });
});
