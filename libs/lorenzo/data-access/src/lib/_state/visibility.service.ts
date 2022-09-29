import { Injectable } from '@angular/core';
import { LocalStorageService } from '@atocha/core/data-access';

import { Card } from '@atocha/lorenzo/util';
import { BehaviorSubject, first, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisibilityService {
  private _prefix = 'LORENZO_';
  private _keys: Record<Card, string> = {
    development: this._prefix + 'DEVELOPMENT_VISIBLE',
    family: this._prefix + 'FAMILY_VISIBLE',
    leader: this._prefix + 'LEADER_VISIBLE',
  };
  private _visibilitySubject = new BehaviorSubject<Record<Card, boolean>>({
    development: this._getVisiblity(this._keys.development),
    family: this._getVisiblity(this._keys.family),
    leader: this._getVisiblity(this._keys.leader),
  });

  visibility$ = this._visibilitySubject.pipe(
    tap(({ development, family, leader }) => {
      this._setVisibility(this._keys.development, development);
      this._setVisibility(this._keys.family, family);
      this._setVisibility(this._keys.leader, leader);
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  toggleVisibility(type: Card): void {
    this._visibilitySubject.pipe(first()).subscribe((visibility) =>
      this._visibilitySubject.next({
        ...visibility,
        [type]: !visibility[type],
      })
    );
  }

  expandAll(): void {
    this._visibilitySubject.next({
      development: true,
      family: true,
      leader: true,
    });
  }

  collapseAll(): void {
    this._visibilitySubject.next({
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
