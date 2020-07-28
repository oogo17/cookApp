/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FallowUserService } from './fallowUser.service';

describe('Service: FallowUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FallowUserService]
    });
  });

  it('should ...', inject([FallowUserService], (service: FallowUserService) => {
    expect(service).toBeTruthy();
  }));
});
