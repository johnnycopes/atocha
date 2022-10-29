import {
  BehaviorSubject,
  distinctUntilChanged,
  first,
  map,
  Observable,
  shareReplay,
} from 'rxjs';

export class Store<T extends object> {
  private _stateSubject: BehaviorSubject<T>;
  private _state$: Observable<T>;

  constructor(state: T) {
    this._stateSubject = new BehaviorSubject(state);
    this._state$ = this._stateSubject.pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  get(): Observable<T> {
    return this._state$;
  }

  getProp<K extends keyof T>(key: K): Observable<T[K]> {
    return this._state$.pipe(
      map((state) => state[key]),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  update(value: T): void {
    this._stateSubject.next(value);
  }

  updateProp<K extends keyof T>(key: K, value: T[K]): void {
    this._state$.pipe(first()).subscribe((state) => {
      this._stateSubject.next({ ...state, [key]: value });
    });
  }
}
