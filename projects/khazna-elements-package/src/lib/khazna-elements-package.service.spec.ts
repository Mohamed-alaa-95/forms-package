import { TestBed } from '@angular/core/testing';

import { KhaznaElemetnsPackageService } from './khazna-elements-package.service';

describe('KhaznaElemetnsPackageService', () => {
  let service: KhaznaElemetnsPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhaznaElemetnsPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
