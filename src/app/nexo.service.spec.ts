import { TestBed } from '@angular/core/testing';

import { NexoService } from './nexo.service';

describe('NexoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NexoService = TestBed.get(NexoService);
    expect(service).toBeTruthy();
  });
});
