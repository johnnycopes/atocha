import { TrackByFunction } from '@angular/core';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function trackByFactory<T>(getId: (item: T) => any): TrackByFunction<T> {
  return function<U extends T>(index: number, item: T & U): any {
    return getId(item);
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
