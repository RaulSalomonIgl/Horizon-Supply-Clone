import { Inject, Injectable } from '@angular/core';
import { COLLECTION_REPOSITORY } from '../tokens';
import { CollectionInterface } from '../interfaces/collection.interface';
import { Observable } from 'rxjs';
import { Collection } from '../entities/collection.model';

@Injectable({ providedIn: 'root' })
export class GetCollectionsUseCase {
  constructor(
    @Inject(COLLECTION_REPOSITORY)
    private collectionInterface: CollectionInterface
  ) {}

  execute(): Observable<Collection[]> {
    return this.collectionInterface.getCollections();
  }
}
