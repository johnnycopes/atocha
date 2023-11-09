import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appUnless]',
})
export class UnlessDirective<T> {
  @Input()
  set appUnless(condition: boolean) {
    if (!condition && !this._hasView) {
      this._viewContainer.createEmbeddedView(this._templateRef);
      this._hasView = true;
    } else if (condition && this._hasView) {
      this._viewContainer.clear();
      this._hasView = false;
    }
  }
  private _hasView = false;

  constructor(
    private _templateRef: TemplateRef<T>,
    private _viewContainer: ViewContainerRef
  ) {}
}
