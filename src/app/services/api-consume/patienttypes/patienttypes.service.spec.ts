import { TestBed } from '@angular/core/testing';

import { PatienttypesService } from './patienttypes.service';

describe('PatienttypesService', () => {
  let service: PatienttypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatienttypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
