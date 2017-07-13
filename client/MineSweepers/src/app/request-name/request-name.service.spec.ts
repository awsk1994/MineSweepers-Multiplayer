import { TestBed, inject } from '@angular/core/testing';

import { RequestNameService } from './request-name.service';

describe('RequestNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestNameService]
    });
  });

  it('should be created', inject([RequestNameService], (service: RequestNameService) => {
    expect(service).toBeTruthy();
  }));
});
