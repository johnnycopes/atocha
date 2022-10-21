import { Inject, Injectable, InjectionToken } from '@angular/core';

export const APP_NAME_TOKEN = new InjectionToken<string>('appName');

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(APP_NAME_TOKEN) private _appName: string) {}

  getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  clear(): void {
    window.localStorage.clear();
  }
}
