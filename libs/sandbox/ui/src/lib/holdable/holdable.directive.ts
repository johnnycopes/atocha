import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Observable, Subject, filter, interval, takeUntil, tap } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appHoldable]',
})
export class HoldableDirective {
  @Output() holdTime: EventEmitter<number> = new EventEmitter();
  public isHolding$: Subject<boolean> = new Subject();
  public cancel$: Observable<boolean> = this.isHolding$.pipe(
    filter((state) => state === false),
    tap(() => {
      this.holdTime.emit(0);
      console.log('%c stopped hold', 'color: crimson; font-weight: bold');
    })
  );

  private _intervalAmount = 100;

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  public onExit(): void {
    this.isHolding$.next(false);
  }

  @HostListener('mousedown', ['$event'])
  public onHold(): void {
    this.isHolding$.next(true);

    console.log('%c started hold', 'color: limegreen; font-weight: bold');
    interval(this._intervalAmount)
      .pipe(
        takeUntil(this.cancel$),
        tap((time) => {
          const ms = time * this._intervalAmount;
          this.holdTime.emit(ms);
        })
      )
      .subscribe();
  }
}
