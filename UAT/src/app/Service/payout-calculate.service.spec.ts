import { TestBed } from '@angular/core/testing';

import { PayoutCalculateService } from './payout-calculate.service';

describe('PayoutCalculateService', () => {
  let service: PayoutCalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayoutCalculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
