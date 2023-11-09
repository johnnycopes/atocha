import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { State } from '@atocha/core/data-access';
import { Card } from '@atocha/lorenzo/util';

@Injectable({
  providedIn: 'root',
})
export class VisibilityService {
  private readonly _keys: Record<Card, string> = {
    development: 'DEVELOPMENT_VISIBLE',
    family: 'FAMILY_VISIBLE',
    leader: 'LEADER_VISIBLE',
  };
  private readonly _visibility = new State<Record<Card, boolean>>({
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
    this._visibility.transformProp(type, (visibility) => !visibility);
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
