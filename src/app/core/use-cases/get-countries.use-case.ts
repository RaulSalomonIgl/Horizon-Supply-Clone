import { Inject, Injectable } from '@angular/core';
import { COUNTRY_REPOSITORY } from '../token';
import { CountryInterface } from '../interfaces/country.interface';
import { Observable } from 'rxjs';
import { Country } from '../entities/country.entity';

@Injectable({ providedIn: 'root' })
export class GetCountriesUseCase {
  constructor(
    @Inject(COUNTRY_REPOSITORY) private countryRepository: CountryInterface
  ) {}

  execute(): Observable<Country[]> {
    return this.countryRepository.getCountries();
  }
}
