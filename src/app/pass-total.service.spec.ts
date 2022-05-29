import { TestBed } from '@angular/core/testing';

import { PassTotalService } from './pass-total.service';

describe('PassTotalService', () => {
  let service: PassTotalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassTotalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
