import { TestBed } from '@angular/core/testing';

import { PrimeWidgetService } from './prime-widget.service';

describe('PrimeWidgetService', () => {
  let service: PrimeWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimeWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
