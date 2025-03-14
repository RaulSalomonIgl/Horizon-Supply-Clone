import { Inject, Injectable } from '@angular/core';
import { STATE_REPOSITORY } from '../token';
import { StateInterface } from '../interfaces/state.interface';
import { Observable } from 'rxjs';
import { State } from '../entities/state.entity';

@Injectable({ providedIn: 'root' })
export class GetStatesByCountryIdUseCase {
  constructor(
    @Inject(STATE_REPOSITORY) private stateRepository: StateInterface
  ) {}

  execute(countryId: number): Observable<State[]> {
    return this.stateRepository.getStatesByCountry(countryId);
  }
}
