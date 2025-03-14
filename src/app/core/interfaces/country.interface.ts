import { Observable } from 'rxjs';
import { Country } from '../entities/country.entity';

export interface CountryInterface {
  getCountries(): Observable<Country[]>;
}
