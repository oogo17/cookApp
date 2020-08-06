/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CountriesAPIService } from './countriesAPI.service';

describe('Service: CountriesAPI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountriesAPIService]
    });
  });

  it('should ...', inject([CountriesAPIService], (service: CountriesAPIService) => {
    expect(service).toBeTruthy();
  }));
});
