import { TestBed, inject } from '@angular/core/testing';

import { GameboardService } from './gameboard.service';

describe('GameboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameboardService]
    });
  });

  it('should be created', inject([GameboardService], (service: GameboardService) => {
    expect(service).toBeTruthy();
  }));
});
