import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { Card } from '@atocha/lorenzo/util';
import { State } from '@atocha/core/util';

export type Visibility = Record<Card, boolean>;

@Injectable({
  providedIn: 'root',
})
export class VisibilityService {
  private _keys: Record<Card, string> = {
    development: 'DEVELOPMENT_VISIBLE',
    family: 'FAMILY_VISIBLE',
    leader: 'LEADER_VISIBLE',
  };
  private _visibility = new State<Visibility>({
    development: this._getVisiblity(this._keys.development),
    family: this._getVisiblity(this._keys.family),
    leader: this._getVisiblity(this._keys.leader),
  });

  visibility$ = this._visibility.get().pipe(
    tap(({ development, family, leader }) => {
      this._setVisibility(this._keys.development, development);
      this._setVisibility(this._keys.family, family);
      this._setVisibility(this._keys.leader, leader);
    })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  toggleVisibility(type: Card): void {
    this._visibility
      .getProp(type)
      .pipe(first())
      .subscribe((visible) => {
        this._visibility.updateProp(type, !visible);
      });
  }

  expandAll(): void {
    this._visibility.update({
      development: true,
      family: true,
      leader: true,
    });
  }

  collapseAll(): void {
    this._visibility.update({
      development: false,
      family: false,
      leader: false,
    });
  }

  private _getVisiblity(key: string): boolean {
    const state = this._localStorageService.getItem(key) ?? 'true';
    return JSON.parse(state);
  }

  private _setVisibility(key: string, value: boolean): void {
    this._localStorageService.setItem(key, JSON.stringify(value));
  }
}
