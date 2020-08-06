import { Country } from './../_models/Country';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesAPIService {

  url = 'https://restcountries.eu/rest/v2/all?fields=name';

constructor(private http: HttpClient) { }

  getCountries() {
   return  this.http.get(this.url);
 }

//  getCountries(name: string) {
//   return  this.http.get(this.url + name + '?fields=name');
// }



}
