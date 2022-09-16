import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, shareReplay, tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { View } from '@atocha/lorenzo/util';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _prefix = 'LORENZO_';
  private _viewKey = this._prefix + 'VIEW';
  private _viewSubject = new BehaviorSubject<View>(
    (this._localStorageService.getItem(this._viewKey) ?? 'all') as View
  );
  private _textSubject = new BehaviorSubject<string>('');

  view$ = this._viewSubject.pipe(
    tap((view) => this._localStorageService.setItem(this._viewKey, view)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  text$ = this._textSubject.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  updateView(view: View): void {
    this._viewSubject.next(view);
  }

  updateText(text: string): void {
    this._textSubject.next(text);
  }
}
