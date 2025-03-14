import { Observable } from 'rxjs';
import { State } from '../entities/state.entity';

export interface StateInterface {
  getStatesByCountry(countryId: number): Observable<State[]>;
}
