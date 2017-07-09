import { TestBed, inject } from '@angular/core/testing';

import { SoloService } from './solo.service';

describe('SoloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoloService]
    });
  });

  it('should be created', inject([SoloService], (service: SoloService) => {
    expect(service).toBeTruthy();
  }));
});
