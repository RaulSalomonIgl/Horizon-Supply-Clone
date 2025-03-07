import { Observable } from 'rxjs';
import { Collection } from '../entities/collection.model';

export interface CollectionInterface {
  getCollections(): Observable<Collection[]>;
}
