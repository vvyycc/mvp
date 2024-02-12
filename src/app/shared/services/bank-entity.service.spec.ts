import { TestBed } from '@angular/core/testing';

import { BankEntityService } from './bank-entity.service';

describe('BankEntityService', () => {
  let service: BankEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
