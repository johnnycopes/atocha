import {
  BehaviorSubject,
  distinctUntilChanged,
  first,
  map,
  Observable,
  shareReplay,
} from 'rxjs';

export class Store<State extends object> {
  private _stateSubject: BehaviorSubject<State>;
  private _state$: Observable<State>;

  constructor(state: State) {
    this._stateSubject = new BehaviorSubject(state);
    this._state$ = this._stateSubject.pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  get(): Observable<State> {
    return this._state$;
  }

  getProp<K extends keyof State>(key: K): Observable<State[K]> {
    return this._state$.pipe(
      map((state) => state[key]),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  update(value: State): void {
    this._stateSubject.next(value);
  }

  updateProp<K extends keyof State>(key: K, value: State[K]): void {
    this._state$.pipe(first()).subscribe((state) => {
      this._stateSubject.next({ ...state, [key]: value });
    });
  }
}
