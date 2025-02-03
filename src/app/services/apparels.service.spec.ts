import { TestBed } from '@angular/core/testing';

import { ApparelsService } from './apparels.service';

describe('ApparelsService', () => {
  let service: ApparelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApparelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
