import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FavoriteService {
  private _favorites$ = new BehaviorSubject<string[]>([]);

  state$ = this._favorites$.asObservable();

  updateFavorites(id: string, state: boolean): void {
    this._favorites$.pipe(first()).subscribe(
      favorites => this._favorites$.next(state ? [...favorites, id] : favorites.filter(favorite => favorite !== id))
    );
  }
}
