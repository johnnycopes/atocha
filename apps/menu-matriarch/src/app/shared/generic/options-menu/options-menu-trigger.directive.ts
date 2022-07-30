import { AfterViewInit, Directive, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OptionsMenuComponent } from './options-menu.component';

@Directive({
  selector: '[appOptionsMenuTrigger]'
})
export class OptionsMenuTriggerDirective implements AfterViewInit, OnDestroy {
  @Input('appOptionsMenuTrigger') menu: OptionsMenuComponent | undefined;
  private _templatePortal: TemplatePortal<unknown> | undefined;
  private _overlayRef: OverlayRef | undefined;
  private _destroy$ = new Subject<void>();

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _overlay: Overlay,
  ) { }

  public ngAfterViewInit(): void {
    if (this.menu?.templateRef) {
      this._templatePortal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);
    }
    this._overlayRef = this._overlay.create({
      disposeOnNavigation: true,
      scrollStrategy: this._overlay.scrollStrategies.close(),
      positionStrategy: this._overlay.position()
        .flexibleConnectedTo(this._viewContainerRef.element.nativeElement)
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          }
        ]),
    })
    this.menu?.closed.pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      () => this._overlayRef?.detach()
    );
    this._overlayRef.outsidePointerEvents().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      ({ target }) => {
        if (target !== this._viewContainerRef.element.nativeElement) {
          this._overlayRef?.detach()
        }
      },
    );
    fromEvent<MouseEvent>(this._viewContainerRef.element.nativeElement, 'click').pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      () => {
        if (this._overlayRef?.hasAttached()) {
          this._overlayRef?.detach();
        } else {
          this._overlayRef?.attach(this._templatePortal);
        }
      }
    );
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._overlayRef?.dispose();
    this._overlayRef = undefined;
  }
}
