import { TestBed } from '@angular/core/testing';

import { FileUploadQueueService } from './file-upload-queue.service';

describe('FileUploadQueueService', () => {
  let service: FileUploadQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
