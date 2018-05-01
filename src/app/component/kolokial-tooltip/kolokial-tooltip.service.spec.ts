import { TestBed, inject } from '@angular/core/testing';

import { KolokialTooltipService } from './kolokial-tooltip.service';

describe('KolokialTooltipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KolokialTooltipService]
    });
  });

  it('should be created', inject([KolokialTooltipService], (service: KolokialTooltipService) => {
    expect(service).toBeTruthy();
  }));
});
