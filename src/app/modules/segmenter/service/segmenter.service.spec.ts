import { TestBed } from '@angular/core/testing';

import { SegmenterService } from './segmenter.service';

describe('SegmenterService', () => {
  let service: SegmenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SegmenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
