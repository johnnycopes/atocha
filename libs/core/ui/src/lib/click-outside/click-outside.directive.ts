import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  standalone: true,
  selector: '[coreClickOutside]',
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  @Output('coreClickOutside') clickOutside: EventEmitter<void> =
    new EventEmitter();
  private _animationFrame: number | undefined;
  private _destroy$ = new Subject<void>();

  constructor(private _elementRef: ElementRef) {}

  ngOnInit(): void {
    // Wait before subscribing to void emitting event in case the host uses *ngIf
    this._animationFrame = requestAnimationFrame(() => {
      fromEvent<MouseEvent>(document, 'click')
        .pipe(
          filter((event) => !this._isClickInside(event)),
          takeUntil(this._destroy$)
        )
        .subscribe(() => this.clickOutside.emit());
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(
          filter((event) => event.key === 'Escape'),
          takeUntil(this._destroy$)
        )
        .subscribe(() => this.clickOutside.emit());
    });
  }

  ngOnDestroy(): void {
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
    }
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _isClickInside(event: MouseEvent): boolean {
    const el = this._elementRef.nativeElement;
    return el === event.target || el.contains(event.target);
  }
}
