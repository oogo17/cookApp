import { Country } from './../_models/Country';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesAPIService {
  zipCode: number;
  url = 'https://restcountries.eu/rest/v2/all?fields=name';
  keyZipCode = '5EcwVO4da7z5h2PQR3JpMvUVbIqcpqMI3u2YwxJGWuQnm4KFasEvGMOCpheklVBD';
  baseUrl = environment.apiUrl;




constructor(private http: HttpClient) { }

  getCountries() {
   return  this.http.get(this.url);
 }

//  getCountries(name: string) {
//   return  this.http.get(this.url + name + '?fields=name');
// }

 getInfoFromZipCode(zipCode: number) {
   this.zipCode = zipCode;
   return this.http.get(this.baseUrl + 'zipcodeapi/' + this.zipCode);


 }

}
