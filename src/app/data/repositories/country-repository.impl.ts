import { Injectable } from '@angular/core';
import { CountryInterface } from '../../core/interfaces/country.interface';
import { map, Observable } from 'rxjs';
import { Country } from '../../core/entities/country.entity';
import { HttpClient } from '@angular/common/http';
import { COUNTRY_REPOSITORY } from '../../core/token';

@Injectable({ providedIn: 'root' })
export class CountryRepositoryImpl implements CountryInterface {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>('/assets/data/countries.json')
      .pipe(map((data) => data.map((item) => new Country(item.id, item.name))));
  }
}

export const COUNTRY_REPOSITORY_PROVIDER = {
  provide: COUNTRY_REPOSITORY,
  useClass: CountryRepositoryImpl,
};
