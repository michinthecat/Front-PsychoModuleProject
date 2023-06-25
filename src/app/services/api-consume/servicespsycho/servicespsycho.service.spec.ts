import { TestBed } from '@angular/core/testing';

import { ServicespsychoService } from './servicespsycho.service';

describe('ServicespsychoService', () => {
  let service: ServicespsychoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicespsychoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
