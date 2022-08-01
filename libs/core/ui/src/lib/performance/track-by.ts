import { TrackByFunction } from '@angular/core';

export function trackByFactory<T>(
  getId: (item: T) => string
): TrackByFunction<T> {
  return function <U extends T>(index: number, item: T & U): string {
    return getId(item);
  };
}

export const trackBySelf = trackByFactory<string>((item) => item);
