import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Collection } from '../../core/entities/collection.model';
import { CollectionInterface } from '../../core/interfaces/collection.interface';
import { COLLECTION_REPOSITORY } from '../../core/tokens';

@Injectable({ providedIn: 'root' })
export class CollectionRepositoryImpl implements CollectionInterface {
  constructor(private http: HttpClient) {}

  getCollections(): Observable<Collection[]> {
    return this.http
      .get<Collection[]>('/assets/data/collections.json')
      .pipe(
        map((data) =>
          data.map(
            (item) =>
              new Collection(item.id, item.name, item.image, item.image_title)
          )
        )
      );
  }
}

export const COLLECTION_REPOSITORY_PROVIDER = {
  provide: COLLECTION_REPOSITORY,
  useClass: CollectionRepositoryImpl,
};
