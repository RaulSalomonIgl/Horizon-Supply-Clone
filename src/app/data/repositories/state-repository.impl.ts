import { Injectable } from '@angular/core';
import { StateInterface } from '../../core/interfaces/state.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { State } from '../../core/entities/state.entity';
import { STATE_REPOSITORY } from '../../core/token';

@Injectable({ providedIn: 'root' })
export class StateRepositoryImpl implements StateInterface {
  constructor(private http: HttpClient) {}

  getStatesByCountry(countryId: number): Observable<State[]> {
    return this.http.get<State[]>('/assets/data/states.json').pipe(
      map((data) =>
        data
          .filter((state) => state.id_country == countryId)
          .map((item) => {
            return new State(item.id, item.id_country, item.name);
          })
      ),
      catchError((error) => throwError(() => error))
    );
  }
}

export const STATE_REPOSITORY_PROVIDER = {
  provide: STATE_REPOSITORY,
  useClass: StateRepositoryImpl,
};
