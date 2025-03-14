import { InjectionToken } from '@angular/core';
import { CountryInterface } from './interfaces/country.interface';
import { StateInterface } from './interfaces/state.interface';

export const COUNTRY_REPOSITORY = new InjectionToken<CountryInterface>(
  'CountryInterface'
);

export const STATE_REPOSITORY = new InjectionToken<StateInterface>(
  'StateInterface'
);
