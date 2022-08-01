import { TrackByFunction } from '@angular/core';

export function trackByFactory<TItem>(getId: (item: TItem) => string): TrackByFunction<TItem> {
  return function <U extends TItem>(index: number, item: TItem & U): string {
    return getId(item);
  };
}

export const trackBySelf = trackByFactory<string>(item => item);
