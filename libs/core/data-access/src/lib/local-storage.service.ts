import { Inject, Injectable, InjectionToken } from '@angular/core';

export const APP_NAME_TOKEN = new InjectionToken<string>('appName');

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _prefix = '';

  constructor(@Inject(APP_NAME_TOKEN) private _appName: string) {
    this._prefix = this._appName + '_';
  }

  getItem(key: string): string | null {
    return window.localStorage.getItem(this._prefix + key);
  }

  setItem(key: string, value: string): void {
    window.localStorage.setItem(this._prefix + key, value);
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(this._prefix + key);
  }

  clear(): void {
    window.localStorage.clear();
  }
}
