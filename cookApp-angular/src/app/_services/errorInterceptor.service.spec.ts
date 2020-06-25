/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErrorInterceptorService } from './errorInterceptor.service';

describe('Service: ErrorInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorInterceptorService]
    });
  });

  it('should ...', inject([ErrorInterceptorService], (service: ErrorInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
